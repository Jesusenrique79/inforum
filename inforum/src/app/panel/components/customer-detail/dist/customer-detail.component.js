"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerDetailComponent = void 0;
var core_1 = require("@angular/core");
var client_service_1 = require("../../../services/client.service");
var CustomerDetailComponent = /** @class */ (function () {
    function CustomerDetailComponent(_router, _route, _clientService) {
        this._router = _router;
        this._route = _route;
        this._clientService = _clientService;
    }
    CustomerDetailComponent.prototype.ngOnInit = function () {
        this.getClient();
    };
    CustomerDetailComponent.prototype.getClient = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = params['id'];
            _this._clientService.getClient(id).subscribe(function (response) {
                if (response.client) {
                    _this.client = response.client;
                }
                else {
                    _this._router.navigate(['/inicio']);
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    CustomerDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-detail',
            templateUrl: './customer-detail.component.html',
            styleUrls: ['./customer-detail.component.css'],
            providers: [client_service_1.ClientService]
        })
    ], CustomerDetailComponent);
    return CustomerDetailComponent;
}());
exports.CustomerDetailComponent = CustomerDetailComponent;
