"use strict";
exports.__esModule = true;
exports.routing = exports.appRoutingProviders = void 0;
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var user_edit_component_1 = require("./components/user-edit/user-edit.component");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'inicio', component: home_component_1.HomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'registro', component: register_component_1.RegisterComponent },
    { path: 'ajustes', component: user_edit_component_1.UserEditComponent },
    { path: '**', component: login_component_1.LoginComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
