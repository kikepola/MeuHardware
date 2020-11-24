const express = require('express');
const router = express.Router();
const controller = require('../controller/ProcessorController')


router.get('/processor', controller.get);

module.exports = router;