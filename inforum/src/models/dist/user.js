"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(_id, name, surname, email, password, image, role) {
        this._id = _id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.image = image;
        this.role = role;
    }
    return User;
}());
exports.User = User;
