import server from './config/server';
const {Service} = require('./src/services/Service')

const PORT = process.env.PORT || 5000;

let service = new Service();
var promise = service.getAll().then((result) => {
  console.log(result)
})


server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});