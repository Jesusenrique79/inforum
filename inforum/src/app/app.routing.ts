
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';




const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', canActivate: [NoIdentityGuard], component: LoginComponent },
    { path: 'registro', canActivate: [NoIdentityGuard], component: RegisterComponent },
    { path: 'ajustes', canActivate: [UserGuard], component: UserEditComponent },
    { path: 'clientes', component: ClientsComponent },
    { path: 'clientes/:page', component: ClientsComponent },
    { path: 'cliente/:id', component: ClientDetailComponent },
    { path: '**', component: HomeComponent }
]; 

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);