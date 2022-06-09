"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEditComponent = void 0;
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var global_1 = require("../../services/global");
var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(_userService, _router, _route) {
        this._userService = _userService;
        this._router = _router;
        this._route = _route;
        this.page_tittle = 'Ajustes de usuario';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = global_1.global.url;
        this.afuConfig = {
            multiple: false,
            formatsAllowed: '.jpg, .jpeg, .png, .gif',
            maxSize: '50',
            uploadAPI: {
                url: this.url + 'upload-avatar',
                headers: {
                    Authorization: this.token
                },
                params: {
                    page: '1'
                },
                responseType: 'json'
            },
            theme: 'attachPin',
            hideProgressBar: false,
            hideResetBtn: true,
            hideSelectBtn: false,
            attachPinText: 'Subir archivo',
            replaceTexts: {
                selectFileBtn: 'Seleccione un archivo',
                resetBtn: 'Reiniciar',
                uploadBtn: 'Subir',
                dragNDropBox: 'Arrastre y suelte',
                attachPinBtn: 'Sube tu avatar',
                afterUploadMsg_success: 'Subida exitosa !',
                afterUploadMsg_error: 'Subida erronea !',
                sizeLimit: 'peso exeido'
            }
        };
    }
    UserEditComponent.prototype.avatarUpload = function (data) {
        var dataObj = data.body;
        this.user.image = dataObj.user.image;
        console.log(this.user);
    };
    UserEditComponent.prototype.ngOnInit = function () {
    };
    UserEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this._userService.update(this.user).subscribe(function (response) {
            if (!response.user) {
                _this.status = 'error';
            }
            else {
                _this.status = 'success';
                localStorage.setItem('identity', JSON.stringify(_this.user));
            }
        }, function (error) {
            _this.status = 'error';
        });
    };
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'app-user-edit',
            templateUrl: './user-edit.component.html',
            styleUrls: ['./user-edit.component.css'],
            providers: [user_service_1.UserService]
        })
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
