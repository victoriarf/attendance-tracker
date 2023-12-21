const ClassModel = require('../models/class.model');
const UserModel = require("../models/user.model");

module.exports = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({error: 'User not found'});
    }

    await user.populate('classes');

    // Respond with the found classes
    res.json(user.classes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
