const UserModel = require('../models/user.model');
const ClassModel = require('../models/class.model');

async function removeNonExistingClasses() {
  try {
    const users = await UserModel.find();

    for (const user of users) {
      user.classes = user.classes.filter(classId => {
        return ClassModel.exists({ _id: classId });
      });

      await user.save();
    }

    console.log('Users updated successfully.');
  } catch (error) {
    console.error('Error updating users:', error.message);
  }
}

module.exports = removeNonExistingClasses;
