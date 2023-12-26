const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  recurring: {
    type: String,
    enum: ['monthly', 'weekly', 'other'],
    required: true,
  },

  lastPayment: {
    type: Date,
    required: false,
  },
  nextPayment: {
    type: Date,
    required: false,
  },
  schedule: [
    {
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true,
      },
      time: {
        type: String,
      },
    },
  ],
})

const ClassModel = mongoose.model('Class', ClassSchema);
module.exports = ClassModel;
