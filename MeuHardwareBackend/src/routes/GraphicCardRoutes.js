const express = require('express');
const router = express.Router();
const controller = require('../controller/GraphicCardController')


router.get('/graphiccard', controller.get);

module.exports = router;