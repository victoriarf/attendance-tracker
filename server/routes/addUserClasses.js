const ClassModel = require('../models/class.model');

module.exports = async (req, res) => {
  const {name, payment = false, price, recurring = 'monthly'} = req.body;

  try {
    const userClass = new ClassModel({name, payment, price, recurring});
    await userClass.save();

    res.json(userClass);
  } catch (e) {
    res.status(500).json({message: e.message})
  }
};

