const UserModel = require('../models/user.model');

module.exports = async (req, res) => {
  const { id }  = req.params;
  const { name }  = req.body;

  const user = UserModel.findById(id);
  user.name = name;
  await user.save();

  res.json(user);
};

