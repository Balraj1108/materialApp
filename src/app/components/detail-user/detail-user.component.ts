import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';


export interface UserForm extends FormGroup<{
  nome: FormControl<string>;
  cognome: FormControl<string>
  dataDiNascita: FormControl<Date>; //
  username: FormControl<string>;
  password: FormControl<string>;
  
}>{}

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
  providers: [DatePipe]
})
export class DetailUserComponent implements OnInit {

  idUser!: number;

  userReactive: UserForm = this.fb.group({
    nome: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
    dataDiNascita: this.fb.nonNullable.control(new Date(),[Validators.required]),
    username: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
    password: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
  });



  constructor(private route: ActivatedRoute, private service: UserService,
    private router: Router, private fb: FormBuilder, private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>){
      this.dateAdapter.setLocale("IT");
    }

    //userForm: User = {id: 0, nome: "", cognome: "", dataDiNascita: ""}
  
  ngOnInit(): void {
    //this.router.url.includes("create")
    if(!(this.router.url.includes("create"))){
    this.idUser = Number( this.route.snapshot.paramMap.get('id'));
    
    this.service.findById(this.idUser)?.subscribe(user => {
      //this.userItem = {...user} problema= non va tanto in prodondità = soluzione => librerie lodash
      //this.userItem = Object.assign({},user);
      if(user.dataDiNascita){
        user.dataDiNascita = new Date(user.dataDiNascita);
      }
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
    //let dataDiNascita: Date = new Date(this.userReactive.value.dataDiNascita?.toISOString().split("T")[0]!);
    // let date = this.userReactive.get('dataDiNascita')?.value.toISOString();
    //     let dateForm = date?.split('T')[0]!;
    //     this.userReactive.get('dataDiNascita')?.setValue(dateForm)
    //console.log(dataDiNascita);
    // console.log(date)
    // console.log(dateForm)
    //let userDaInserire: User={...this.userReactive.getRawValue()};
    //console.log(userDaInserire.dataDiNascita?.toISOString().split("T")[0]);
    console.log(this.userReactive.value)
    this.service.create(this.userReactive.getRawValue()).subscribe({
      next: utenteItem => this.userReactive.patchValue(utenteItem),
      complete: () => this.router.navigate([`list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
    })
    //this.service.create(userDaInserire);
    
  }
  

  visibilitaId(){
    if((this.router.url.split("/")[1]==="detail")){
    return true;
    }
    else{
      return false;
    }

  }

  modificaUtente(){
    let utenteDaModificare: User={...this.userReactive.getRawValue(), id: this.idUser};
    this.service.edit(utenteDaModificare).subscribe({
      next: utenteDaModificareItem => utenteDaModificare = utenteDaModificareItem,
      complete:() => this.router.navigate(["list"])
    });
    //this.router.navigate(["list"]);
  }
  /**
   * this.service.create(this.userReactive.getRawValue()).subscribe({
      next: utenteItem => this.userReactive.patchValue(utenteItem),
      complete: () => this.router.navigate([`list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
    })
   * @returns 
   */

  isReadOnlyBottMod(){
    if((this.router.url.split("/")[1]==="edit")){
      return true; 
      }
      else{

      return false;
      }
  }



 

}
