const StudentModel = require('../../models/student.model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const student = await StudentModel.findById(id);

  await student.deleteOne();
  res.status(204).json(student);
};

