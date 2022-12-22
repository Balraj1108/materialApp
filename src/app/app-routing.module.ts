import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';

const routes: Routes = [
  {
    path: "list",
    component: ListUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "create",
    component: DetailUserComponent
  },
  {
    path: "detail/:id",
    component: DetailUserComponent
  },
  {
    path: "edit/:id",
    component: DetailUserComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
