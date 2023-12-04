const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'data.json'), 'utf-8');
const dataObj = JSON.parse(data);

module.exports = (req, res) => {
  const userName = req.params.userName;
  const user = dataObj.users.find(user => user.name === userName);
  const newClass = req.body;

  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }

  const classes = user.classes;

  classes.push(newClass);

  res.json(classes);
};
