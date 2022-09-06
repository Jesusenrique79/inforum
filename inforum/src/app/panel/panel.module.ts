import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelRoutingModule } from './panel-routing.module';
import { MomentModule } from 'angular2-moment';

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


import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';



@NgModule({
    declarations: [
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent,
        AllCustomersComponent,
        CustomersComponent,
        CustomerDetailComponent,
        UsersComponent,
        ProfileComponent,
        SearchComponent,
        RegisterUserComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        MomentModule

    ],
    exports: [
        MainComponent,
        AddComponent,
        EditComponent,
        ListComponent,
        AllCustomersComponent,
        CustomersComponent,
        CustomerDetailComponent,
        UsersComponent,
        ProfileComponent,
        SearchComponent,
        RegisterUserComponent
    ],
    providers: [
        UserService,
        UserGuard
    ]
})

export class PanelModule {}