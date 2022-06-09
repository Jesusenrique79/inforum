"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var user_1 = require("../../../models/user");
var user_service_1 = require("../../services/user.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_userService, _router, _route) {
        this._userService = _userService;
        this._router = _router;
        this._route = _route;
        this.page_tittle = 'Identificate';
        this.user = new user_1.User('', '', '', '', '', '', 'ROLE_USER');
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        //Conseguir objeto completo de uduario logueado
        this._userService.signup(this.user).subscribe(function (response) {
            if (response.user && response.user._id) {
                //Guardamos el usuario en una propiedad
                _this.identity = response.user;
                localStorage.setItem('identity', JSON.stringify(_this.identity));
                //Conseguir el token de usuario logueado
                _this._userService.signup(_this.user, true).subscribe(function (response) {
                    if (response.token) {
                        //Guardar el token del usuario en una propiedad
                        _this.token = response.token;
                        localStorage.setItem('token', _this.token);
                        _this.status = 'success';
                        _this._router.navigate(['/inicio']);
                    }
                    else {
                        _this.status = 'error';
                    }
                }, function (error) {
                    _this.status = 'error';
                });
                form.reset();
            }
            else {
                _this.status = 'error';
            }
        }, function (error) {
            _this.status = 'error';
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [user_service_1.UserService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
