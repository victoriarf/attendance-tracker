const ClassModel = require('../../models/class.model');
const StudentModel = require("../../models/student.model");

module.exports = async (req, res) => {
  try {
    const studentId = req.params.userId;
    const student = await StudentModel.findById(studentId);

    if (!student) {
      return res.status(404).json({error: 'Student not found'});
    }

    await student.populate('classes');

    // Respond with the found classes
    res.json(student.classes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
