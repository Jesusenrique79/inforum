'use strict'; //IMPORTAR MONGOOSE

var mongoose = require('mongoose'); //DEFINIR UN SCHEMA


var Schema = mongoose.Schema; //CREAR SCHEMA DE USUARIO/ OBJETO MOLDE PARA UTILIZAR PARA CREAR NUEVOS 
//USUARIOS(DOCUMENTOS) EN LA BASE DE DATOS 

var UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  image: String,
  role: String
});

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', UserSchema); //EN MONGOOSE SE GUARDA AUTOMATICAMENTE COMO USUARlet PORQUE LO GENERALIZA 
//Y LO PONE EN MINUSCULAS
//Usuarios => guarda los documents en la coleccion