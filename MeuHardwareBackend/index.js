import server from './config/server';
require('dotenv/config')

const PORT = process.env.PORT || 5000;

const graphicCardRoute = require('./src/routes/GraphicCardRoutes');
const motherBoarddRoute = require('./src/routes/MotherBoardRoutes');
const memoryRoute = require('./src/routes/MemoryRoutes');
const processorCardRoute = require('./src/routes/ProcessorRoutes');

server.use('/', graphicCardRoute);
server.use('/', motherBoarddRoute);
server.use('/', memoryRoute);
server.use('/', processorCardRoute);

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});