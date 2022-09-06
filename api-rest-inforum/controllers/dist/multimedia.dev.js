'use strict';

var validator = require('validator');

var Client = require('../models/client');

var controller = {
  add: function add(req, res) {
    //Recoger el id del cliente de la url
    var clientId = req.params.clientId; //Find por id del cliente

    Client.findById(clientId).exec(function (err, client) {
      if (err) {
        return res.status(200).send({
          message: "Metodo añadir multimedia"
        });
      }

      if (!client) {
        return res.status(404).send({
          status: 'error',
          message: 'Cliente no existe'
        });
      } //Comprobar objeto usuario (si esta identificado) y validar datos


      var params = req.body;

      if (params.comment) {
        //Validar datos
        var validate_comment;

        try {
          validate_comment = !validator.isEmpty(params.comment);
        } catch (error) {
          return res.status(200).send({
            message: "No has comentado nada"
          });
        }

        if (validate_comment) {
          var content = {
            user: req.user.sub,
            comment: req.body.comment //document: req.body.document,
            //video: req.body.video

          }; //En la propiedad multimedia del objeto resultante, hacer un push

          client.multimedia.push(content); //Guardar el cliente completo

          client.save(function (err) {
            if (err) {
              return res.status(200).send({
                message: "Error al guardar Multimedia"
              });
            } //Devolver una respuesta


            return res.status(500).send({
              status: 'success',
              client: client
            });
          });
        } else {
          return res.status(200).send({
            message: "No se han validado los datos del comentario"
          });
        }
      }
    });
  },
  update: function update(req, res) {
    //Conseguir id de un comentario que llega por la url
    var multimediaId = req.params.multimediaId; //Recoger datos y validar

    var params = req.body; //Validar datos

    var validate_comment;

    try {
      validate_comment = !validator.isEmpty(params.comment);
    } catch (err) {
      return res.status(200).send({
        message: "No has comentado nada"
      });
    }

    if (validate_comment) {
      //Find y update de subdocumento
      Client.findOneAndUpdate({
        "multimedia._id": multimediaId
      }, {
        "$set": {
          "multimedia.$.comment": params.comment
        }
      }, {
        "new": true
      }, function (err, clientUpdated) {
        if (err) {
          return res.status(200).send({
            status: 'Error',
            message: "Error en la petición"
          });
        }

        if (!clientUpdated) {
          return res.status(404).send({
            status: 'error',
            message: 'Cliente no existe'
          });
        } //Devolver Datos


        return res.status(200).send({
          status: 'success',
          clientUpdated: clientUpdated
        });
      });
    }
  },
  "delete": function _delete(req, res) {
    //Sacar el id del cliente y del comentario a borrar
    var clientId = req.params.clientId;
    var multimediaId = req.params.multimediaId; //Buscar el cliente

    Client.findById(clientId, function (err, client) {
      if (err) {
        return res.status(200).send({
          status: 'Error',
          message: "Error en la petición"
        });
      }

      if (!client) {
        return res.status(404).send({
          status: 'error',
          message: 'Cliente no existe'
        });
      } //Seleccionar el subdocumento(comentario)


      var comment = client.multimedia.id(multimediaId); //Borrar el comentario

      if (comment) {
        comment.remove(); //Guardar el cliente

        client.save(function (err) {
          if (err) {
            return res.status(200).send({
              status: 'Error',
              message: "Error en la petición"
            });
          } //Devolver un resultado


          return res.status(200).send({
            status: 'success',
            client: client
          });
        });
      } else {
        return res.status(404).send({
          status: 'error',
          message: 'No existe el comentario'
        });
      }
    });
  },
  search: function search(req, res) {
    //Sacar el string de la url
    var searchString = req.params.search; //Find or

    Client.find({
      "$or": [{
        "name": {
          "$regex": searchString,
          "$options": "i"
        }
      }, {
        "surname": {
          "$regex": searchString,
          "$options": "i"
        }
      }, {
        "idetification": {
          "$regex": searchString,
          "$options": "i"
        }
      }, {
        "email": {
          "$regex": searchString,
          "$options": "i"
        }
      }]
    }).populate('user').sort([['date', 'descending']]).exec(function (err, clients) {
      if (err) {
        return res.status(500).send({
          status: 'error',
          message: 'Error en la petición'
        });
      }

      if (!clients) {
        return res.status(404).send({
          status: 'error',
          message: 'No hay clientes disponibles'
        });
      } //Devolver resultado


      return res.status(200).send({
        status: 'success',
        clients: clients
      });
    });
  }
};
module.exports = controller;