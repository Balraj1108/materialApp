import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: UserService,
    private router: Router){}

  userItem: User = {id: 0, nome: "", cognome: "", dataDiNascita: ""}
  
  ngOnInit(): void {
    //this.router.url.includes("create")
    if(!(this.router.url.includes("create"))){
    let id: number = Number( this.route.snapshot.paramMap.get('id'));
    
    this.service.findById(id)?.subscribe(user => {
      //this.userItem = {...user} problema= non va tanto in prodondità = soluzione => librerie lodash
      this.userItem = Object.assign({},user);

    });
    }
  }

  isReadOnly() {
    //your condition, in this case textarea will be disbaled.
    if((this.router.url.split("/")[1]==="detail")){
    return true; 
    }
    else{
    return false;
    }
  }

  isReadOnlyBott(){
    if((this.router.url.split("/")[1]==="detail" || this.router.url.split("/")[1]==="edit")){
      return false; 
      }
      else{

      return true;
      }
  }

  insertUtente(){
    let id:number = this.service.incrementoId();
    let automobileDaInserire: User={id, nome:this.userItem.nome, cognome:this.userItem.cognome, dataDiNascita:this.userItem.dataDiNascita};
    this.service.create(automobileDaInserire);
    this.router.navigate(["list"]);
    
  }

  visibilitaId(){
    if((this.router.url.split("/")[1]==="detail")){
    return true;
    }
    else{
      return false;
    }

  }

  modificaUtente(idDaPagina: number){
    let automobileDaInserire: User={id: idDaPagina, nome:this.userItem.nome, cognome:this.userItem.cognome, dataDiNascita:this.userItem.dataDiNascita};
    this.service.edit(automobileDaInserire);
    this.router.navigate(["list"]);
  }

  isReadOnlyBottMod(){
    if((this.router.url.split("/")[1]==="edit")){
      return true; 
      }
      else{

      return false;
      }
  }

 

}
