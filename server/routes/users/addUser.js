const StudentModel = require('../../models/student.model');

module.exports = async (req, res) => {
  const { name }  = req.body;

  const student = new StudentModel({name});
  await student.save();

  res.json(student);
};

