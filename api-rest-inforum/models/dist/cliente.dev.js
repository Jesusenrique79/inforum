'use strict'; //IMPORTAR MONGOOSE

var mongoose = require('mongoose'); //DEFINIR UN SCHEMA


var Schema = mongoose.Schema; //CREAR SCHEMA DE USUARIO/ OBJETO MOLDE PARA UTILIZAR PARA CREAR NUEVOS 
//USUARIOS(DOCUMENTOS) EN LA BASE DE DATOS 

var UserSchema = Schema({
  name: String,
  surname: String,
  email: Number,
  password: Number,
  image: String,
  role: String
});
module.exports = mongoose.model('User', UserSchema); //EN MONGOOSE SE GUARDA AUTOMATICAMENTE COMO PROJECTS PORQUE LO GENERALIZA 
//Y LO PONE EN MINUSCULAS
//Projects => guarda los documents en la colecclet