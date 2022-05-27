'use strict'
let validator = require('validator');
let bcrypt = require('bcrypt-nodejs');
let fs = require('fs');
let path = require('path');
let User = require('../models/user');
let jwt = require('../services/jwt')
let controller = {
    save: function(req, res) {
        //RECOJER LOS PARAMETROS DE LA PETICION
        let params = req.body;
        //VALIDAR LOS DATOS
        let validate_name;
        let validate_surname;
        let validate_email;
        let validate_password;

        try {
            validate_name = !validator.isEmpty(params.name);
            validate_surname = !validator.isEmpty(params.surname);
            validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            validate_password = !validator.isEmpty(params.password);

        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar",

            });
        }
        if (validate_name && validate_surname && validate_email && validate_password) {
            //CREAR OBJETO DE USUARIO
            let user = new User();
            //ASIGNAR VALORES DE OBJETO AL OBJETO
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.password = params.password;
            user.image = null;
            user.role = 'ROLE_USER';
            //COMPROBAR SI EL USUARIO EXISTE
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad del usuario"
                    });

                }

                if (!issetUser) {
                    //SI NO EXISTE
                    //CIFRAR LA CONTRASEÑA
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        //Y GUARDAR USUARIOS
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });

                            }

                            if (!userStored) {
                                return res.status(400).send({
                                    message: "El usuario no se ha guardado"
                                });
                            }
                            //DEVOLVER RESPUESTA
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });
                        }); //CLOSE SAVE

                    }); //CLOSE BCRYPT

                } else {
                    return res.status(500).send({
                        message: "El Usuario ya está registrado"
                    });

                }
            });

        } else {
            return res.status(200).send({
                message: "Validación de los datos del usuario incorrecta.Intentelo de nuevo"
            });
        }



    },

    login: function(req, res) {
        //RECOJER LOS PARAMETROS DE LA PETICION
        let params = req.body;
        //VALIDAR LOS DATOS
        let validate_email;
        let validate_password;
        try {
            validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            validate_password = !validator.isEmpty(params.password);

        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar"

            });
        }


        if (!validate_email || !validate_password) {
            return res.status(200).send({
                message: "Los datos son incorrectos, envialos bien"
            });
        }

        //BUSCAR USUARIO QUE COINCIDA CON EL EMAIL
        User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

            if (err) {
                return res.status(500).send({
                    message: "Error al intentar identificarse"
                });
            }

            if (!user) {
                return res.status(404).send({
                    message: "El usuario no existe"
                });
            }

            //SI LO ENCUENTRA
            //COMPROBAR LA CONTRASEÑA (COINCIDENCIA DE EMAIL Y PASSWORD / BCRYPT)
            bcrypt.compare(params.password, user.password, (err, check) => {
                // SI ES CORRECTO 
                if (check) {
                    //GENERAR TOKEN DE JWT Y DEVOLVERLO
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        //LIMPIAR EL OBJETO
                        user.password = undefined;
                        // DEVOLVER LOS DATOS
                        return res.status(200).send({
                            status: "success",
                            user
                        });
                    }


                } else {
                    return res.status(200).send({
                        message: "Las credenciales no son correctas"
                    });
                }

            });

        });



    },

    update: function(req, res) {

        //RECOGER DATOS DEL USUARIO
        let params = req.body;

        //VALIDAR LOS DATOS
        let validate_name;
        let validate_surname;
        let validate_email;

        try {
            validate_name = !validator.isEmpty(params.name);
            validate_surname = !validator.isEmpty(params.surname);
            validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);

        } catch (err) {
            return res.status(200).send({
                message: "Faltan datos por enviar"

            });
        }


        //ELIMINAR PROPIEDADES INNECESARIAS
        delete params.password;



        let userId = req.user.sub;

        //COMPROBAR SI EL EMAIL ES UNICO
        if (req.user.email != params.email) {

            User.findOne({ email: params.email.toLowerCase() }, (err, user) => {

                if (err) {
                    return res.status(500).send({
                        message: "Error al intentar identificarse"
                    });
                }

                if (user && user.email == params.email) {
                    return res.status(200).send({
                        message: "El email no puede ser modificado"
                    });
                } else {
                    //BUSCAR Y ACTUALIZAR DOCUMENTOS
                    User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdated) => {

                        if (err) {
                            return res.status(500).send({
                                status: 'error',
                                message: "Error al actualizar usuario"
                            });
                        }

                        if (!userUpdated) {
                            return res.status(500).send({
                                status: 'error',
                                message: "No se ha actualizado el usuario"
                            });
                        }
                        //DEVOLVER RESPUESTA
                        return res.status(200).send({
                            status: 'success',
                            user: userUpdated
                        });
                    });
                }
            });

        } else {

            //BUSCAR Y ACTUALIZAR DOCUMENTOS
            User.findOneAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdated) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: "Error al actualizar usuario"
                    });
                }

                if (!userUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: "No se ha actualizado el usuario"
                    });
                }
                //DEVOLVER RESPUESTA
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated
                });
            });
        }


    },

    uploadAvatar: function(req, res) {
        //Confifigurar el modulo multiparty(md)
        //Recoger el fichero de la peticion
        let file_name = 'Avatar no subido...';
        //Comprobar que el req.files llega
        if (!req.files) {

            return res.status(404).send({
                status: 'error',
                message: file_name
            });

        }
        //Conseguir el nombre y la extensión del archivo subido, 
        let file_path = req.files.file0.path;
        let file_split = file_path.split('\\');
        //Nombre del archivo
        file_name = file_split[2];
        //Extension del archivo
        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];
        //Comprobar extension (solo imagenes), si no es la extension, borrarla
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            fs.unlink(file_path, (err) => {
                return res.status(500).send({
                    status: 'error',
                    message: 'La extensión del archivo no es valida'
                });
            });
        } else {
            //Sacar el id del usuario identificado
            let userId = req.user.sub;
            //Buscar y actualizar documento de la BD
            User.findByIdAndUpdate({ _id: userId }, { image: file_name }, { new: true }, (err, userUpdated) => {

                if (err || !userUpdated) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al guardar el usuario',
                        file: file_ext
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated
                });

            });

        }

    },

    avatar: function(req, res) {
        let fileName = req.params.fileName;
        let pathFile = './uploads/users' + fileName;
        console.log(fileName);

        fs.access(pathFile, fs.constants.W_OK, (err) => {
            if (!err) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(404).send({
                    message: 'La imagen no existe'
                });
            }
        });
    },

    getUsers: function(req, res) {
        User.find().exec((err, users) => {
            if (err || !users) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay usuarios que mostrar'
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    users
                });
            }


        });
    },
    getUser: function(req, res) {
        let userId = req.params.userId;

        User.findById(userId).exec((err, user) => {

            if (err || !user) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el usuario'
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    user
                });
            }

        });
    }
}
module.exports = controller;