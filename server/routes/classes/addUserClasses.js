const ClassModel = require('../../models/class.model');
const UserModel = require("../../models/user.model");

module.exports = async (req, res) => {
  const {name, payment = false, price, recurring = 'monthly'} = req.body;

  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new class
    const userClass = new ClassModel({ name, payment, price, recurring });
    await userClass.save();

    // Push the new class to the user's classes array
    user.classes.push(userClass);


    // Save the updated user
    await user.save();

    if (!userClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(userClass);
  } catch (e) {
    res.status(500).json({message: e.message})
  }
};
