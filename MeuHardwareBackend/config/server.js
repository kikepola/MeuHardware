const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

export default server;