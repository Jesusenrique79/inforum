import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { UserGuard } from '../services/user.guard';

import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { AllCustomersComponent } from './components/all-customers/all-customers.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';



const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        canActivate: [ UserGuard],
        children: [
            { path: '', component: ListComponent },
            { path: 'listado', component: ListComponent },
            { path: 'crear', component: AddComponent },
            { path: 'todoslosclientes', component: AllCustomersComponent },
            { path: 'todoslosclientes/:page', component: AllCustomersComponent },
            { path: 'perfildeclientes', component: CustomersComponent },
            { path: 'perfildeclientes/:page', component: CustomersComponent },
            { path: 'detallesdelcliente/:id', component: CustomerDetailComponent },
            { path: 'registrodeusuario', component: RegisterUserComponent },
            { path: 'usuarios', component: UsersComponent },
            { path: 'perfil/:id', component: ProfileComponent },
            { path: 'buscar/:search', component: SearchComponent },
            { path: 'editar/:id', component: EditComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PanelRoutingModule { }