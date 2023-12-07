const ClassModel = require('../models/class.model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { alias, payment = false }  = req.body;

  const userClass = await ClassModel.findById(id);
  userClass.alias = alias;
  userClass.payment = payment;

  await userClass.save();
  res.json(userClass);
};

