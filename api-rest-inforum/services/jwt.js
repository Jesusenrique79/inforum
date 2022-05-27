'use strict'
let jwt = require('jwt-simple');
let moment = require('moment');

exports.createToken = function(user) {
    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        image: user.image,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix


    };

    return jwt.encode(payload, 'clave-secreta-para-generar-el-token-8888');
};