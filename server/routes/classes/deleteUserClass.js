const ClassModel = require('../../models/class.model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const userClass = await ClassModel.findById(id);

  await userClass.deleteOne();
  res.status(204).json(userClass);
};

