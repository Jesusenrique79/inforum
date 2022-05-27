'use strict'

//IMPORTAR MONGOOSE
let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
//DEFINIR UN SCHEMA
let Schema = mongoose.Schema;

//MODELO DE MULTIMEDIA
let multimediaSchema = Schema({
    comment: String,
    //document: String,
    //video: String,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' }

});

let Multimedia = mongoose.model('Multimedia', multimediaSchema);


//CREAR SCHEMA DE CLIENTES/ OBJETO MOLDE PARA UTILIZAR PARA CREAR NUEVOS 
//CLIENTES(DOCUMENTOS) EN LA BASE DE DATOS 

let ClientSchema = Schema({

    name: String,
    surname: String,
    identification: Number,
    phone: Number,
    email: String,
    address: String,
    status: Boolean,
    date: { type: Date, default: Date.now },
    user: { type: Schema.ObjectId, ref: 'User' },
    multimedia: [multimediaSchema]

});
//Cargar paginación
ClientSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Client', ClientSchema);
//EN MONGOOSE SE GUARDA AUTOMATICAMENTE COMO PROJECTS PORQUE LO GENERALIZA 
//Y LO PONE EN MINUSCULAS
//Projects => guarda los documents en la colecclet