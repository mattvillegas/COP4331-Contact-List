import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashComponent } from './dash/dash.component';

import {AuthService} from './services/auth.service'
import { ValidateService } from './services/validate.service';

const appRoutes: Routes =[
  { path:'', component: HomeComponent },
  { path: 'register', component: RegisterComponent},
  { path:'dash', component: DashComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [AuthService,ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
