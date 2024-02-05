const StudentModel = require('../../models/student.model');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentModel.findById(id);
    if (!student) return;

    await student.deleteOne();
    res.status(204).json({});
  } catch (e) {
    console.log('Cannot delete user ', e);
  }
};
