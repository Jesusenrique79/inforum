"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var global_1 = require("./global");
var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = global_1.global.url;
    }
    UserService.prototype.prueba = function () {
        return "Hola mundo desde el servicio de angular";
    };
    UserService.prototype.register = function (user) {
        //Convertir el objeto del usuario a un json String
        var params = JSON.stringify(user);
        //Definir las cabeceras
        var headers = new http_1.HttpHeaders().set('Content-type', 'application/json');
        //Hacer petición ajax
        return this._http.post(this.url + 'register', params, { headers: headers });
    };
    UserService.prototype.signup = function (user, gettoken) {
        if (gettoken === void 0) { gettoken = null; }
        //Comprobar si llega el gettoken
        if (gettoken != null) {
            user.gettoken = gettoken;
        }
        var params = JSON.stringify(user);
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers: headers });
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem('identity'));
        if (identity && identity != null && identity != undefined && identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        if (token && token != null && token != undefined && token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.identity;
    };
    UserService.prototype.update = function (user) {
        var params = JSON.stringify(user);
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.put(this.url + 'update', params, { headers: headers });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
