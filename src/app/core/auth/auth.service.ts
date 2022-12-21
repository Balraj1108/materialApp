import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private apiServer = 'http://localhost:8080/api/auth/login';
  private apiServerForRoles = 'http://localhost:8080/api/utente/userInfo';

  login(loginForm: User): Observable<User>{
    //setta l'utente loggato
   // this.setUserLogged(loginForm);
    //return of({username: loginForm.username, token: "" });
    //return this.http.post<User>(this.apiServer, JSON.stringify(loginForm))
    return this.http.post<{'jwt-token': string}>(this.apiServer, JSON .stringify(loginForm), this.httpOptions).pipe(
      map(res => { 
        return {username: loginForm.username, token: res['jwt-token'] }
      })
    );
    // return this.http.post<User>("login", JSON .stringify(loginForm));

  }

  roles(): Observable<{ roles: string[] }> {
    return this.http.get<{ roles: string[] }>(this.apiServerForRoles);
  }

  setUserLogged(user: User | null){
    this.userLoggedSubject$.next(user);
  }

  getUserLogged(): Observable<User | null>{
    return this.userLoggedSubject$.asObservable();
  }

  isLoggedIn(): boolean{
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToke(): string | null | undefined {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  logout(){
    this.setUserLogged(null);
  }

}
