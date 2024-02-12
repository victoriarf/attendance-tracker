const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');
const morgan = require('morgan');
const removeNonExistingClasses = require('./scripts/removeNonExistingClasses');

require('dotenv').config();

const PORT = process.env.PORT || config.get('port') || 5000;
// const mongoDbUrl = config.get('mongoDbUrl');
const mongoDbUrl = process.env.MONGODB_URL;

app.use(cors());
app.use(morgan('tiny'));
app.use(router);

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log('Connected to Mongoose');
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(e => console.log('Error in MONGOOSE CONNECT: ', e));

// app.listen(PORT, () => {
//   console.log(`server listening on port ${PORT}`)
// });
