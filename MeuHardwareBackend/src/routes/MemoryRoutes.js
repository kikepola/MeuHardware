const express = require('express');
const router = express.Router();
const controller = require('../controller/MemoryController')


router.get('/memory', controller.get);

router.post('/memory', controller.post);


module.exports = router;