const UserModel = require('../../models/user.model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  await user.deleteOne();
  res.status(204).json(user);
};

