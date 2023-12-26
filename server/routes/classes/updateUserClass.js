const ClassModel = require('../../models/class.model');
const UserModel = require("../../models/user.model");

module.exports = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, payment = false, schedule} = req.body;

    // const user = await UserModel.findById(userId);
    //
    // if (!user) {
    //   return res.status(404).json({error: 'User not found'});
    // }

    const userClass = await ClassModel.findById(id);
    if (!!name) {
      userClass.name = name;
    }

    if (!!payment) {
      userClass.payment = payment;
    }

    if (!!schedule) {
      userClass.schedule = schedule;
    }

    await userClass.save();
    res.json(userClass);
  } catch (e) {
    console.log('Error updating class ', e);
  }

};

