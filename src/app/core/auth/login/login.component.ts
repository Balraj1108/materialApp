import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth.service';

export interface LoginForm extends FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>{}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private service: UserService,
     private fb: FormBuilder) { }


     userReactive: LoginForm = this.fb.group({
      username: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
      password: this.fb.nonNullable.control("",[Validators.required, Validators.minLength(4)]),
    });

  utente: User = {username: "", password: "", token: ""};
  destroy$: Subject<boolean> = new Subject();

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(): void{
    this.authService.login(this.userReactive.getRawValue())
    .pipe(takeUntil(this.destroy$))
    .subscribe(res =>

      {
        this.authService.setUserLogged(res);
        this.router.navigate(["list"])})
  }

}