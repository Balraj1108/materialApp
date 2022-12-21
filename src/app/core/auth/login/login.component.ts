import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  utente: User = {username: "", password: "", token: ""};
  destroy$: Subject<boolean> = new Subject();

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(loginForm: NgForm): void{
    this.authService.login(loginForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res =>

      {
        this.authService.setUserLogged(res);
        this.route.navigate(["list"])})
  }

}