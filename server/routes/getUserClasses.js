const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'data.json'), 'utf-8');
const dataObj = JSON.parse(data);

module.exports = (req, res) => {
  const userName = req.params.userName;
  const user = dataObj.users.find(user => user.name === userName);

  if (!user) {
    return res.status(404).json({error: 'User not found'});
  }

  const classes = user.classes;

  if (!classes || classes.length === 0) {
    return res.status(404).json({error: 'No classes found for the given user'});
  }

  // Respond with the found classes
  res.json(classes);
};
