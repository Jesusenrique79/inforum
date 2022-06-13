"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../../../services/user.service");
var client_service_1 = require("../../../services/client.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(_route, _router, _userService, _clientService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._clientService = _clientService;
        this.page_tittle = 'Listado de clientes';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    ListComponent.prototype.ngOnInit = function () {
        this.getClients();
    };
    ListComponent.prototype.getClients = function () {
        var _this = this;
        var userId = this.identity._id;
        this._clientService.geClientsByUser(userId).subscribe(function (response) {
            if (response.clients) {
                _this.clients = response.clients;
            }
        }, function (error) {
            console.log(error);
        });
    };
    ListComponent.prototype.deleteClient = function (id) {
        var _this = this;
        this._clientService["delete"](this.token, id).subscribe(function (response) {
            _this.getClients();
        }, function (error) {
            console.log(error);
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css'],
            providers: [user_service_1.UserService, client_service_1.ClientService]
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
