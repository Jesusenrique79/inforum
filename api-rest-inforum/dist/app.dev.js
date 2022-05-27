'use strict';

var express = require('express');

var app = express(); // CARGAR ARCHIVOS DE RUTAS

var user_routes = require('./routes/user');

var client_routes = require('./routes/client');

var multimedia_routes = require('./routes/multimedia'); //MIDDLEWARES


app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //CORS
// Configurar cabeceras y cors

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
}); //RUTAS

app.use('/api', user_routes);
app.use('/api', client_routes);
app.use('/api', multimedia_routes); //EXPORTAR

module.exports = app;