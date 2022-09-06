"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PanelModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var panel_routing_module_1 = require("./panel-routing.module");
var angular2_moment_1 = require("angular2-moment");
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
var user_service_1 = require("../services/user.service");
var user_guard_1 = require("../services/user.guard");
var PanelModule = /** @class */ (function () {
    function PanelModule() {
    }
    PanelModule = __decorate([
        core_1.NgModule({
            declarations: [
                main_component_1.MainComponent,
                add_component_1.AddComponent,
                edit_component_1.EditComponent,
                list_component_1.ListComponent,
                all_customers_component_1.AllCustomersComponent,
                customers_component_1.CustomersComponent,
                customer_detail_component_1.CustomerDetailComponent,
                users_component_1.UsersComponent,
                profile_component_1.ProfileComponent,
                search_component_1.SearchComponent,
                register_user_component_1.RegisterUserComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                panel_routing_module_1.PanelRoutingModule,
                angular2_moment_1.MomentModule
            ],
            exports: [
                main_component_1.MainComponent,
                add_component_1.AddComponent,
                edit_component_1.EditComponent,
                list_component_1.ListComponent,
                all_customers_component_1.AllCustomersComponent,
                customers_component_1.CustomersComponent,
                customer_detail_component_1.CustomerDetailComponent,
                users_component_1.UsersComponent,
                profile_component_1.ProfileComponent,
                search_component_1.SearchComponent,
                register_user_component_1.RegisterUserComponent
            ],
            providers: [
                user_service_1.UserService,
                user_guard_1.UserGuard
            ]
        })
    ], PanelModule);
    return PanelModule;
}());
exports.PanelModule = PanelModule;
