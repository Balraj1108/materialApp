import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServer = 'http://localhost:8080/api/utente';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private UTENTI: User[]=[
    {id: 1, nome: "ciao", cognome: "singh", dataDiNascita: new Date()}
    
]

/** GET registi from the server */
getUtentiOf(): Observable<User[]> {
  return this.http.get<User[]>(this.apiServer)
}


getUtenti(): User[]{
  return this.UTENTI;
}

// getUtentiOf(): Observable<User[]>{
//   return of(this.UTENTI);
// }

findById(idInput: number){

  return this.http.get<User>(this.apiServer +"/" + idInput);
}


  // findById(idInput: number): Observable<User>{

  //   return of(this.UTENTI.find(a => a.id == idInput)!);
  // }

  // eliminaUtenteService(idEliminare: number) {

  //   let indiceLista = this.UTENTI.findIndex(a => a.id == idEliminare);
  //   this.UTENTI.splice(indiceLista, 1);
  // }

  eliminaUtente(idUtenteEliminare: number){

    return this.http.delete<boolean>(this.apiServer +"/" + idUtenteEliminare)
  }

  // edit(userUpdate:User):Observable<User[]>{
  //   this.UTENTI.filter(a => a.id == userUpdate.id).map(a => { a.nome = userUpdate.nome; a.cognome = userUpdate.cognome; a.dataDiNascita = userUpdate.dataDiNascita; });
  //   return of(this.UTENTI);
  // }

  edit(userInput: User): Observable<User> {
    return this.http.put<User>(this.apiServer + "/" + userInput.id, userInput, this.httpOptions);
  }

  // listaId:number[]=this.UTENTI.map(a=>a.id!);

  // incrementoId():number{
  //   return Math.max.apply(null,this.listaId!)+1;

  // }

  // create(userInsert:User){
  //   userInsert.id=this.incrementoId();
  //   this.UTENTI.push(userInsert);
    
  // }

  create(userInput: User): Observable<User> {
   
    return this.http.post<User>(this.apiServer, userInput, this.httpOptions)
  }

  /**
   * 
   *   create(userInput: User): Observable<User> {
        return this.http.post<User>(this.apiServer, userInput, this.httpOptions);
      }
   * 
   */

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      err.error?.errors?.forEach((element: { message: string; }) => {
        errorMessage += element.message;
      });
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  constructor(private http: HttpClient) { }
}
