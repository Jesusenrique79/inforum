'use strict';

var express = require('express');

var UserController = require('../controllers/user');

var router = express.Router();

var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');

var md_upload = multipart({
  uploadDir: './uploads/users'
}); //Rutas de Usuarios

router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update);
router.post('/upload-avatar/', [md_auth.authenticated, md_upload], UserController.uploadAvatar);
router.get('/avatar/:fileName', UserController.avatar);
router.get('/users', UserController.getUsers);
router.get('/user/:userId', UserController.getUser);
module.exports = router;