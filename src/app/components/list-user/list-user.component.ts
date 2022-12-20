import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private service: UserService, private route: Router, public dialog: MatDialog, public serviceSnack: SnackbarService){}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  


  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    this.getData();
  }

  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dataDiNascita',"azioni"];

  getData(){
    this.service.getUtentiOf().subscribe(res =>{
      this.dataSource = new MatTableDataSource<User>(res);
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

  selectUtenteDaEliminare(id: number){

    this.service.eliminaUtenteService(id);
    this.serviceSnack.openSnackbar("Utente Eliminato")
    this.getData();
    this.dataSource.paginator = this.paginator;
    
  }


}
