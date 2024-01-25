const mongoose = require('mongoose');

// TODO: add validation
// + username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
