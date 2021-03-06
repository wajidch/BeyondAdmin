import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { OrdersComponent } from './orders/orders.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthComponent } from './_layouts/auth/auth.component';
import { AdminComponent } from './_layouts/admin/admin.component';

import { AgmCoreModule } from '@agm/core';
import { FilterComponent } from './filter/filter.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { JobListComponent } from './job-list/job-list.component';
import { TeamListComponent } from './team-list/team-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    AdminComponent,
    FilterComponent,
    UserRegisterComponent,
    JobListComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCn1Glzx53ZKTwNMJSZjIoy09W4tlfChPM'
    })
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
