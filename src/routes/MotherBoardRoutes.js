const express = require('express');
const router = express.Router();
const controller = require('../controller/MotherBoardController')


router.get('/motherboard', controller.get);

router.post('/motherboard', controller.post);


module.exports = router;