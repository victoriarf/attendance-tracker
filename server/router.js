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
    .get(require('./routes/users/getUsers'))
    .post(require('./routes/users/addUser'))

router.route('/users/:id')
    .put(require('./routes/users/updateUser'))
    .delete(require('./routes/users/deleteUser'))

// Classes
router.route('/classes/:userId')
    .get(require('./routes/classes/getUserClasses'))
    .post(require('./routes/classes/addUserClasses'))

router.route('/classes/:id')
    .put(require('./routes/classes/updateUserClass'))
    .delete(require('./routes/classes/deleteUserClass'))


module.exports = router;
