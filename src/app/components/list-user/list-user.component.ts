import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private service: UserService, private route: Router, public dialog: MatDialog, public serviceSnack: SnackbarService,
    private dateAdapter: DateAdapter<Date>){
      this.dateAdapter.setLocale("IT")
    }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dataDiNascita',"azioni"];

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    
    this.getData();
  }

  

  getData(){
    this.service.getUtentiOf().subscribe(res =>{
      this.dataSource.data = res;
    })
  }

  selectUtenteById(id: number){

    this.route.navigate(["detail",id]);
  }

  selectUtenteModifica(id: number){
    this.route.navigate(["edit",id]);
  }

  createUtente() {
    this.route.navigate(["create"]);
  }

  varBoolean: boolean = true;

  selectUtenteDaEliminare(id: number){

    this.service.eliminaUtente(id).subscribe({next: res => this.varBoolean = res,
      complete: () => this.route.navigate(["list"])});
    this.serviceSnack.openSnackbar("Utente Eliminato")
    this.getData();
    this.dataSource.paginator = this.paginator;
    
  }


}
