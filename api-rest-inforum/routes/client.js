'use strict'

let express = require('express');
let ClientController = require('../controllers/client');

let router = express.Router();
let md_auth = require('../middleware/authenticated');

router.get('/test', ClientController.test);
router.post('/client', md_auth.authenticated, ClientController.save);
router.get('/clients/:page?', ClientController.getClients);
router.get('/user-clients/:user', ClientController.getClientsByUser);
router.get('/client/:id', ClientController.getClient);
router.put('/client/:id', md_auth.authenticated, ClientController.update);
router.delete('/client/:id', md_auth.authenticated, ClientController.delete);

module.exports = router;