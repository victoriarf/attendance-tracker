const ClassModel = require('../../models/class.model');
const StudentModel = require("../../models/student.model");

module.exports = async (req, res) => {
  const {name, payment = false, price, recurring = 'monthly'} = req.body;

  try {
    const studentId = req.params.userId;

    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new class
    const userClass = new ClassModel({ name, payment, price, recurring });
    await userClass.save();

    // Push the new class to the user's classes array
    student.classes.push(userClass);


    // Save the updated user
    await student.save();

    if (!userClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(userClass);
  } catch (e) {
    res.status(500).json({message: e.message})
  }
};
