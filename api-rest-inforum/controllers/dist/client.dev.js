'use strict';

var validator = require('validator');

var Client = require('../models/client');

var controller = {
  test: function test(req, res) {
    return res.status(200).send({
      message: "Hola que tal"
    });
  },
  save: function save(req, res) {
    //Recoger parametros por post 
    var params = req.body; //Validar datos 

    var validate_name;
    var validate_surname;
    var validate_identification;
    var validate_phone;
    var validate_status;
    var validate_email;
    var validate_address;

    try {
      validate_name = !validator.isEmpty(params.name);
      validate_surname = !validator.isEmpty(params.surname);
      validate_identification = !validator.isEmpty(params.identification);
      validate_phone = !validator.isEmpty(params.phone);
      validate_status = !validator.isEmpty(params.status);
      validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
      validate_address = !validator.isEmpty(params.address);
    } catch (err) {
      return res.status(200).send({
        message: "Faltan datos por enviar"
      });
    }

    if (validate_name && validate_surname && validate_identification && validate_phone && validate_status && validate_email && validate_address) {
      //Crear objeto a guardar
      var client = new Client(); //Asignar valores

      client.name = params.name;
      client.surname = params.surname;
      client.identification = params.identification;
      client.phone = params.phone;
      client.status = params.status;
      client.email = params.email;
      client.address = params.address;
      client.user = req.user.sub; //Guardar el cliente

      client.save(function (err, clientStored) {
        if (err || !clientStored) {
          return res.status(404).send({
            status: 'Error',
            message: 'El cliente no se ha guardado'
          });
        } //Devolver una respuesta


        return res.status(200).send({
          status: "success",
          client: clientStored
        });
      });
    } else {
      return res.status(200).send({
        message: "Los datos no son validos"
      });
    }
  },
  getClients: function getClients(req, res) {
    //Cargar la libreria de paginación en la clase (Modelo)
    //Recoger la pagina actual
    var page;

    if (!req.params.page || req.params.page == 0 || req.params.page == '0' || req.params.page == null || req.params.page == undefined) {
      page = 1;
    } else {
      page = parseInt(req.params.page);
    } //Indicar las opciones de paginación 


    var options;
    options = {
      sort: {
        date: -1
      },
      populate: 'user',
      limit: 5,
      page: page
    }; //Find paginado

    Client.paginate({}, options, function (err, clients) {
      if (err) {
        return res.status(500).send({
          status: 'Error',
          message: 'Error al hacer la consulta'
        });
      }

      if (!clients) {
        return res.status(404).send({
          status: 'error',
          message: 'No hay clientes'
        });
      } //Devolver resultado (clientes, total de clientes, total de paginas  )


      return res.status(200).send({
        status: 'success',
        clients: clients.docs,
        totalDocs: clients.totalDocs,
        totalPages: clients.totalPages
      });
    });
  },
  getClientsByUser: function getClientsByUser(req, res) {
    //Conseguir el id del usuario
    var userId = req.params.user; //Find con una condicion de usuario

    Client.find({
      user: userId
    }).sort([['date', 'descending']]).exec(function (err, clients) {
      if (err) {
        //Devolver resultado
        return res.status(500).send({
          status: 'error',
          message: 'Error en la peticion'
        });
      }

      if (!clients) {
        //Devolver resultado
        return res.status(404).send({
          status: 'error',
          message: 'No hay clientes para mostrar'
        });
      } //Devolver resultado


      return res.status(200).send({
        status: 'success',
        clients: clients
      });
    });
  },
  getClient: function getClient(req, res) {
    //Sacar el id del cliente de la url
    var clientId = req.params.id; //Find por id del cliente

    Client.findById(clientId).populate('user').exec(function (err, client) {
      if (err) {
        //Devolver resultado
        return res.status(500).send({
          status: 'error',
          message: 'Error en la peticion'
        });
      }

      if (!client) {
        //Devolver resultado
        return res.status(404).send({
          status: 'error',
          message: 'Cliente no existe'
        });
      } //Devolver el resultados


      return res.status(200).send({
        status: 'success',
        client: client
      });
    });
  },
  update: function update(req, res) {
    //Recoger el id del cliente de la url
    var clientId = req.params.id; //Recoger los datos que llegan desde post

    var params = req.body; //Validar datos
    //Validar datos 

    var validate_name;
    var validate_surname;
    var validate_identification;
    var validate_phone;
    var validate_status;
    var validate_email;
    var validate_address;

    try {
      validate_name = !validator.isEmpty(params.name);
      validate_surname = !validator.isEmpty(params.surname);
      validate_identification = !validator.isEmpty(params.identification);
      validate_phone = !validator.isEmpty(params.phone);
      validate_status = !validator.isEmpty(params.status);
      validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
      validate_address = !validator.isEmpty(params.address);
    } catch (err) {
      return res.status(200).send({
        message: "Faltan datos por enviar"
      });
    }

    if (validate_name && validate_surname && validate_identification && validate_phone && validate_status && validate_email && validate_address) {
      //Montar un jeson con los datos modificables
      //let update;
      var update = {
        name: params.name,
        surname: params.surname,
        identification: params.identification,
        phone: params.phone,
        status: params.status,
        email: params.email,
        address: params.address
      }; //Find and update del cliente por id y por id de usuario

      Client.findOneAndUpdate({
        _id: clientId,
        user: req.user.sub
      }, update, {
        "new": true
      }, function (err, clientUpdated) {
        if (err) {
          return res.status(500).send({
            status: 'error',
            message: "Error en la petición"
          });
        }

        if (!clientUpdated) {
          return res.status(404).send({
            status: 'error',
            message: "El cliente no se ha actualizado"
          });
        } //Devolver una respuesta


        return res.status(200).send({
          status: 'success',
          client: clientUpdated
        });
      });
    } else {
      return res.status(200).send({
        message: 'La validación de los datos no es correcta'
      });
    }
  },
  "delete": function _delete(req, res) {
    //Sacar el Id del cliente por la url
    var clientId = req.params.id; //Find and delete por clienteId y por userId

    Client.findOneAndDelete({
      _id: clientId,
      user: req.user.sub
    }, function (err, clientRemoved) {
      if (err) {
        return res.status(500).send({
          status: 'error',
          message: "Error en la petición"
        });
      }

      if (!clientRemoved) {
        return res.status(404).send({
          status: 'error',
          message: "No se ha borrado el cliente"
        });
      } //Devolver respuesta


      return res.status(200).send({
        status: 'success',
        client: clientRemoved
      });
    });
  }
};
module.exports = controller;