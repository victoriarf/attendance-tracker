const express = require('express');
const config = require('config');
const app = express();

const PORT = process.env.PORT || config.get('port') || 5000;

console.log('app', app)

app.get('/', (req, res) => {
  res.send('Hey');
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
