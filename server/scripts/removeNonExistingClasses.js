const StudentModel = require('../models/student.model');
const ClassModel = require('../models/class.model');

async function removeNonExistingClasses() {
  try {
    const students = await StudentModel.find();

    for (const student of students) {
      student.classes = student.classes.filter(classId => {
        return ClassModel.exists({ _id: classId });
      });

      await student.save();
    }

    console.log('Students updated successfully.');
  } catch (error) {
    console.error('Error updating students:', error.message);
  }
}

module.exports = removeNonExistingClasses;
