"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var global_1 = require("./global");
var ClientService = /** @class */ (function () {
    //public identity;
    //public token;
    function ClientService(_http) {
        this._http = _http;
        this.url = global_1.global.url;
    }
    ClientService.prototype.prueba = function () {
        return 'Bievenidos a Inforum';
    };
    ClientService.prototype.addClient = function (token, client) {
        var params = JSON.stringify(client);
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'client', params, { headers: headers });
    };
    ClientService.prototype.geClientsByUser = function (userId) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'user-clients/' + userId, { headers: headers });
    };
    /*
        getClient(id):Observable<any> {
            return this._http.get(this.url + 'client/' + id);
        }
    */
    ClientService.prototype.update = function (token, id, client) {
        var params = JSON.stringify(client);
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.put(this.url + 'client/' + id, params, { headers: headers });
    };
    ClientService.prototype["delete"] = function (token, id) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http["delete"](this.url + 'client/' + id, { headers: headers });
    };
    ClientService.prototype.getClients = function (page) {
        if (page === void 0) { page = 1; }
        return this._http.get(this.url + 'clients/' + page);
    };
    ClientService.prototype.getClient = function (id) {
        return this._http.get(this.url + 'client/' + id);
    };
    ClientService.prototype.search = function (searchString) {
        return this._http.get(this.url + 'search/' + searchString);
    };
    ClientService = __decorate([
        core_1.Injectable()
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;
