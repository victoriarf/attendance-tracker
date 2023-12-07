const UserModel = require('../models/user.model');

module.exports = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};
