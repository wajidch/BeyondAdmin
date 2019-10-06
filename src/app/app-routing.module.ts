import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './_layouts/auth/auth.component';
import {AdminComponent} from './_layouts/admin/admin.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { JobListComponent } from './job-list/job-list.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login', component: AuthComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {
    path: '', component: AdminComponent,
    children: [
      {path: 'joblist', component: JobListComponent},
      {path: 'teamlist', component: TeamListComponent},
      {path: 'userlist', component: UserRegisterComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
