const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    recurring: {
      type: String,
      enum: ['monthly', 'individual'], // 'per-session'
      required: true,
    },
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
  settings: {
    type: Object,
    required: false,
    color: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: false,
    },
  },
});

const ClassModel = mongoose.model('Class', ClassSchema);
module.exports = ClassModel;
