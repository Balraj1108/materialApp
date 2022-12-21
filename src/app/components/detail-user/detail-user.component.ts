import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


export interface UserForm extends FormGroup<{
  nome: FormControl<string>;
  cognome: FormControl<string>;
  id: FormControl<number>;
  dataDiNascita: FormControl<string>;
}>{}

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

userReactive: UserForm = this.fb.group({
  id: this.fb.nonNullable.control(0),
  nome: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
  cognome: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
  dataDiNascita: this.fb.nonNullable.control("",[Validators.required])
});






  constructor(private route: ActivatedRoute, private service: UserService,
    private router: Router, private fb: FormBuilder){}

    userForm: User = {id: 0, nome: "", cognome: "", dataDiNascita: ""}
  
  ngOnInit(): void {
    //this.router.url.includes("create")
    if(!(this.router.url.includes("create"))){
    let id: number = Number( this.route.snapshot.paramMap.get('id'));
    
    this.service.findById(id)?.subscribe(user => {
      //this.userItem = {...user} problema= non va tanto in prodondità = soluzione => librerie lodash
      //this.userItem = Object.assign({},user);
      this.userReactive.patchValue(user);

    });
    }
    if((this.router.url.includes("detail"))){
      this.userReactive.disable();
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
    let automobileDaInserire: User={...this.userReactive.getRawValue(), id};
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

  modificaUtente(idDaModificare: number){
    let automobileDaInserire: User={...this.userReactive.getRawValue(), id: idDaModificare};
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
