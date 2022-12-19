import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UTENTI: User[]=[
    {id: 1, nome: "ciao", cognome: "singh", dataDiNascita: "10-12-2022"},
    {id: 2, nome: "cidsaao", cognome: "rossi", dataDiNascita: "10-12-2022"},
    {id: 3, nome: "mario", cognome: "verdi", dataDiNascita: "10-12-2022"},
    {id: 4, nome: "mario", cognome: "verdi", dataDiNascita: "10-12-2022"},
    {id: 5, nome: "mario", cognome: "verdi", dataDiNascita: "10-12-2022"},
    {id: 6, nome: "mario", cognome: "verdi", dataDiNascita: "10-12-2022"},
    {id: 7, nome: "mario", cognome: "verdi", dataDiNascita: "10-12-2022"},
    {id: 8, nome: "mario", cognome: "verdi", dataDiNascita: "10-12-2022"},
]

getUtenti(): User[]{
  return this.UTENTI;
}

getUtentiOf(): Observable<User[]>{
  return of(this.UTENTI);
}


  constructor() { }
}
