import server from './config/server';
require('dotenv/config')

const graphicCardRoute = require('./src/routes/GraphicCardRoutes');
const motherBoarddRoute = require('./src/routes/MotherBoardRoutes');
const memoryRoute = require('./src/routes/MemoryRoutes');
const processorCardRoute = require('./src/routes/ProcessorRoutes');

server.use('/', graphicCardRoute);
server.use('/', motherBoarddRoute);
server.use('/', memoryRoute);
server.use('/', processorCardRoute);

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});