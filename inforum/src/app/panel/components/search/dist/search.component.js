"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchComponent = void 0;
var core_1 = require("@angular/core");
var client_service_1 = require("../../../services/client.service");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(_router, _route, _clientService) {
        this._router = _router;
        this._route = _route;
        this._clientService = _clientService;
        this.page_tittle = 'Buscar:';
        this.no_paginate = true;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var search = params['search'];
            _this.page_tittle = _this.page_tittle + ' ' + search;
            _this.getClients(search);
        });
    };
    SearchComponent.prototype.getClients = function (search) {
        var _this = this;
        this._clientService.search(search).subscribe(function (response) {
            if (response.clients) {
                _this.clients = response.clients;
            }
        }, function (error) {
            console.log(error);
        });
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: '../customers/customers.component.html',
            styleUrls: ['./search.component.css'],
            providers: [client_service_1.ClientService]
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
