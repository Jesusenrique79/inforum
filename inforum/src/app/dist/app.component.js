"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("./services/user.service");
var global_1 = require("./services/global");
var AppComponent = /** @class */ (function () {
    function AppComponent(_userService, _router, _route) {
        this._userService = _userService;
        this._router = _router;
        this._route = _route;
        this.title = 'inforum';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = global_1.global.url;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log(this.identity);
        console.log(this.token);
    };
    AppComponent.prototype.ngDoCheck = function () {
        this.identity = this._userService.getIdentity();
    };
    AppComponent.prototype.logOut = function () {
        localStorage.clear();
        this.identity = null;
        this.token = null;
        this._router.navigate(['/inicio']);
    };
    AppComponent.prototype.goSearch = function () {
        this._router.navigate(['/panel/buscar', this.search]);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [user_service_1.UserService]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
