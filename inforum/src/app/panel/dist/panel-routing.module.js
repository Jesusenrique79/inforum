"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PanelRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_guard_1 = require("../services/user.guard");
var main_component_1 = require("./components/main/main.component");
var add_component_1 = require("./components/add/add.component");
var edit_component_1 = require("./components/edit/edit.component");
var list_component_1 = require("./components/list/list.component");
var all_customers_component_1 = require("./components/all-customers/all-customers.component");
var customers_component_1 = require("./components/customers/customers.component");
var customer_detail_component_1 = require("./components/customer-detail/customer-detail.component");
var register_user_component_1 = require("./components/register-user/register-user.component");
var users_component_1 = require("./components/users/users.component");
var profile_component_1 = require("./components/profile/profile.component");
var search_component_1 = require("./components/search/search.component");
var panelRoutes = [
    {
        path: 'panel',
        component: main_component_1.MainComponent,
        canActivate: [user_guard_1.UserGuard],
        children: [
            { path: '', component: list_component_1.ListComponent },
            { path: 'listado', component: list_component_1.ListComponent },
            { path: 'crear', component: add_component_1.AddComponent },
            { path: 'todoslosclientes', component: all_customers_component_1.AllCustomersComponent },
            { path: 'todoslosclientes/:page', component: all_customers_component_1.AllCustomersComponent },
            { path: 'perfildeclientes', component: customers_component_1.CustomersComponent },
            { path: 'perfildeclientes/:page', component: customers_component_1.CustomersComponent },
            { path: 'detallesdelcliente/:id', component: customer_detail_component_1.CustomerDetailComponent },
            { path: 'registrodeusuario', component: register_user_component_1.RegisterUserComponent },
            { path: 'usuarios', component: users_component_1.UsersComponent },
            { path: 'perfil/:id', component: profile_component_1.ProfileComponent },
            { path: 'buscar/:search', component: search_component_1.SearchComponent },
            { path: 'editar/:id', component: edit_component_1.EditComponent }
        ]
    }
];
var PanelRoutingModule = /** @class */ (function () {
    function PanelRoutingModule() {
    }
    PanelRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(panelRoutes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], PanelRoutingModule);
    return PanelRoutingModule;
}());
exports.PanelRoutingModule = PanelRoutingModule;
