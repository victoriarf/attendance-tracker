const StudentModel = require('../../models/student.model');

module.exports = async (req, res) => {
  const student = await StudentModel.find();
  res.json(student);
};
