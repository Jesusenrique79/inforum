import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MomentModule } from 'angular2-moment';


import { PanelModule } from './panel/panel.module';
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';


import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { from } from 'rxjs';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    ClientsComponent,
    ClientDetailComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AngularFileUploaderModule,
    PanelModule,
    MomentModule
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService,
    NoIdentityGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
