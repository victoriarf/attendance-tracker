const StudentModel = require('../../models/student.model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name }  = req.body;

  try {
    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ error: 'User not found', name });
    }

    student.name = name;
    student.classes = student.classes || [];
    await student.save()

    return res.status(200).json({ message: 'User updated successfully', user: student });

  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
