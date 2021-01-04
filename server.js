const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/MeuHardwareWeb'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/MeuHardwareWeb/index.html');
});


app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
})
