const UserModel = require('../models/user.model');

module.exports = async (req, res) => {
  const { name }  = req.body;

  const user = new UserModel({name});
  await user.save();

  res.json(user);
};

