const express = require('express');
const router = express.Router();
const controller = require('../controller/GeralController')


router.get('/id', controller.get);

module.exports = router;