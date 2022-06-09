"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var user_1 = require("../../../models/user");
var user_service_1 = require("../../services/user.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_userService) {
        this._userService = _userService;
        this.page_tittle = 'Registrate';
        this.user = new user_1.User('', '', '', '', '', '', 'ROLE_USER');
    }
    RegisterComponent.prototype.ngOnInit = function () {
        console.log(this._userService.prueba());
    };
    RegisterComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this._userService.register(this.user).subscribe(function (response) {
            if (response.user && response.user._id) {
                _this.status = 'success';
                form.reset();
            }
            else {
                _this.status = 'error';
            }
        }, function (error) {
            _this.status = 'error';
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css'],
            providers: [user_service_1.UserService]
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
