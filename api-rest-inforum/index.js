'use strict'

//IMPORTAR LA LIBRERIA MONGOOSE
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3700;


mongoose.set('useFindAndModify', false);
//HACER LA CONEXION A LA BASE DE DATOS
mongoose.promise = global.promise;
mongoose.connect('mongodb://localhost:27017/api_rest_inforum', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        console.log('La conexión a la base de datos se ha realizado con exito....');

        //CREACION DEL SERVIDOR
        app.listen(port, () => {

            console.log('Servidor corriendo correctamente en la url: localhost:3700');
        });

    })
    .catch(err => console.log(err));