"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditComponent = void 0;
var core_1 = require("@angular/core");
var client_1 = require("../../../../models/client");
var user_service_1 = require("../../../services/user.service");
var client_service_1 = require("../../../services/client.service");
var EditComponent = /** @class */ (function () {
    function EditComponent(_route, _router, _userService, _clientService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._clientService = _clientService;
        this.pageTittle = 'Editar cliente';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.client = new client_1.Client('', '', '', '', '', '', '', '', '', this.identity._id, null);
        this.is_edit = true;
    }
    EditComponent.prototype.ngOnInit = function () {
        this.getClient();
    };
    EditComponent.prototype.getClient = function () {
        var _this = this;
        this._route.params.subscribe(function (params) {
            var id = params['id'];
            _this._clientService.getClient(id).subscribe(function (response) {
                if (!response.client) {
                    _this._router.navigate(['/panel']);
                }
                else {
                    _this.client = response.client;
                }
            }, function (error) {
                console.log(error);
            });
        });
    };
    EditComponent.prototype.onSubmit = function (form) {
        var _this = this;
        var id = this.client._id;
        this._clientService.update(this.token, id, this.client).subscribe(function (response) {
            if (response.client) {
                _this.status = 'success';
                _this.client = response.client;
            }
            else {
                _this.status = 'error';
            }
        }, function (error) {
            _this.status = 'error';
        });
    };
    EditComponent = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: '../add/add.component.html',
            styleUrls: ['./edit.component.css'],
            providers: [user_service_1.UserService, client_service_1.ClientService]
        })
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
