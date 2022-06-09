"use strict";
exports.__esModule = true;
exports.Client = void 0;
var Client = /** @class */ (function () {
    function Client(_id, name, surname, identification, phone, email, address, status, date, user, multimedia) {
        this._id = _id;
        this.name = name;
        this.surname = surname;
        this.identification = identification;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.status = status;
        this.date = date;
        this.user = user;
        this.multimedia = multimedia;
    }
    return Client;
}());
exports.Client = Client;
