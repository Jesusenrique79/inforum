"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientsComponent = void 0;
var core_1 = require("@angular/core");
var client_service_1 = require("../../services/client.service");
var ClientsComponent = /** @class */ (function () {
    function ClientsComponent(_router, _route, _clientService) {
        this._router = _router;
        this._route = _route;
        this._clientService = _clientService;
        this.page_tittle = 'Clientes';
    }
    ClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var page = params['page'];
            if (!page || page == null || page == false || page == undefined) {
                page = 1;
                _this.prev_page = 1;
                _this.next_page = 2;
            }
            _this.getClients(page);
        });
    };
    ClientsComponent.prototype.getClients = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this._clientService.getClients(page).subscribe(function (response) {
            if (response.clients) {
                _this.clients = response.clients;
                //Navegación de paginación
                _this.totalPages = response.totalPages;
                var number_pages = [];
                for (var i = 1; i <= _this.totalPages; i++) {
                    number_pages.push(i);
                }
                _this.number_pages = number_pages;
                if (page >= 2) {
                    _this.prev_page = page - 1;
                }
                else {
                    _this.prev_page = 1;
                }
                if (page < _this.totalPages) {
                    _this.next_page = page + 1;
                }
                else {
                    _this.next_page = _this.totalPages;
                }
            }
            else {
                _this._router.navigate(['/inicio']);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ClientsComponent = __decorate([
        core_1.Component({
            selector: 'app-clients',
            templateUrl: './clients.component.html',
            styleUrls: ['./clients.component.css'],
            providers: [client_service_1.ClientService]
        })
    ], ClientsComponent);
    return ClientsComponent;
}());
exports.ClientsComponent = ClientsComponent;
