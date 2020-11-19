import server from './config/server';
require('dotenv/config')

const PORT = process.env.PORT || 5000;

const graphicCardRoute = require('./src/routes/GraphicCardRoutes');

server.use('/', graphicCardRoute);

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});