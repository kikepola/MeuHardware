import server from './config/server';
require('dotenv/config')

const graphicCardRoute = require('./src/routes/GraphicCardRoutes');
const motherBoarddRoute = require('./src/routes/MotherBoardRoutes');
const memoryRoute = require('./src/routes/MemoryRoutes');
const processorCardRoute = require('./src/routes/ProcessorRoutes');
const geraldRoute = require('./src/routes/GeralController');

server.use('/', graphicCardRoute);
server.use('/', motherBoarddRoute);
server.use('/', memoryRoute);
server.use('/', processorCardRoute);
server.use('/', geraldRoute);

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d", this.address().port);
});