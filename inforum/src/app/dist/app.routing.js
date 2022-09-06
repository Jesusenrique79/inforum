"use strict";
exports.__esModule = true;
exports.routing = exports.appRoutingProviders = void 0;
var router_1 = require("@angular/router");
var user_guard_1 = require("./services/user.guard");
var no_identity_guard_1 = require("./services/no.identity.guard");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var user_edit_component_1 = require("./components/user-edit/user-edit.component");
var clients_component_1 = require("./components/clients/clients.component");
var client_detail_component_1 = require("./components/client-detail/client-detail.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'inicio', component: home_component_1.HomeComponent },
    { path: 'login', canActivate: [no_identity_guard_1.NoIdentityGuard], component: login_component_1.LoginComponent },
    { path: 'registro', canActivate: [no_identity_guard_1.NoIdentityGuard], component: register_component_1.RegisterComponent },
    { path: 'ajustes', canActivate: [user_guard_1.UserGuard], component: user_edit_component_1.UserEditComponent },
    { path: 'clientes', component: clients_component_1.ClientsComponent },
    { path: 'clientes/:page', component: clients_component_1.ClientsComponent },
    { path: 'cliente/:id', component: client_detail_component_1.ClientDetailComponent },
    { path: '**', component: home_component_1.HomeComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
