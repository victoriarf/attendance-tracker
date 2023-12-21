const express = require('express');
const router = express.Router();
const fs = require('fs');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

router.use(express.json());


// API
router.get('/api', (req, res) => {
  res.send(data);
});

router.post('/login', require('./routes/loginRoute'));

router.get('/profile', require('./routes/getProfile'));

// Users
router.route('/users')
    .get(require('./routes/getUsers'))
    .post(require('./routes/addUser'))

router.route('/users/:id')
    .put(require('./routes/updateUser'))
    .delete(require('./routes/deleteUser'))

// Classes
router.route('/classes/:userId')
    .get(require('./routes/getUserClasses'))
    .post(require('./routes/addUserClasses'))

router.route('/classes/:userId/:id')
    .put(require('./routes/updateUserClass'))
    .delete(require('./routes/deleteUserClass'))


module.exports = router;
