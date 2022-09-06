"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../../../services/user.service");
var global_1 = require("../../../services/global");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(_userService) {
        this._userService = _userService;
        this.page_tittle = 'Usuarios';
        this.url = global_1.global.url;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this._userService.getUsers().subscribe(function (response) {
            if (response.users) {
                _this.users = response.users;
            }
        }, function (error) {
            console.log(error);
        });
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'app-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css'],
            providers: [user_service_1.UserService]
        })
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
