const express = require('express');
const router = express.Router();
const controller = require('../controller/MotherBoardController')


router.get('/motherboard', controller.get);

module.exports = router;