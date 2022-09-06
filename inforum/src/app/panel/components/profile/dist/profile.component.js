"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../../../services/user.service");
var client_service_1 = require("../../../services/client.service");
var global_1 = require("../../../services/global");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(_userService, _clientService, _route, _router) {
        this._userService = _userService;
        this._clientService = _clientService;
        this._route = _route;
        this._router = _router;
        this.url = global_1.global.url;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var userId = params['id'];
            _this.getUser(userId);
            _this.getClients(userId);
        });
    };
    ProfileComponent.prototype.getUser = function (userId) {
        var _this = this;
        this._userService.getUser(userId).subscribe(function (response) {
            if (response.user) {
                _this.user = response.user;
            }
            else {
            }
        }, function (error) {
            console.log(error);
        });
    };
    ProfileComponent.prototype.getClients = function (userId) {
        var _this = this;
        this._clientService.geClientsByUser(userId).subscribe(function (response) {
            if (response.clients) {
                _this.clients = response.clients;
            }
        }, function (error) {
            console.log(error);
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css'],
            providers: [user_service_1.UserService, client_service_1.ClientService]
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
