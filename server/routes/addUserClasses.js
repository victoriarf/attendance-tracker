const ClassModel = require('../models/class.model');

module.exports = async (req, res) => {
  const { alias, payment = false }  = req.body;

  const userClass = new ClassModel({ alias, payment});
  await userClass.save();

  res.json(userClass);
};

