'use strict'

let express = require('express');
let MultimediaController = require('../controllers/multimedia');

let router = express.Router();
let md_auth = require('../middleware/authenticated');


router.post('/multimedia/client/:clientId', md_auth.authenticated, MultimediaController.add);
router.put('/multimedia/:multimediaId', md_auth.authenticated, MultimediaController.update);
router.delete('/multimedia/:clientId/:multimediaId', md_auth.authenticated, MultimediaController.delete);
router.get('/search/:search', MultimediaController.search);

module.exports = router;