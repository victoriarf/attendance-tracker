const express = require('express');
const router = express.Router();
const fs = require('fs');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


// API
router.get('/api', (req, res) => {
  res.send(data);
});

router.get('/', (req, res) => {
  res.send('Hey');
});

router.post('/login', require('./routes/loginRoute'));

router.get('/profile', require('./routes/getProfile'));

router.route('/classes/:userName')
    .get(require('./routes/getUserClasses'))
    .post(require('./routes/addUserClasses'));


module.exports = router;
