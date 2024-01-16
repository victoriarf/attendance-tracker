var mongoose = require('mongoose');

/**
 * User is a user who has registered
 * Student is a child or another person, added in the application
 * User & Student
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, number, HydratedDocument<FlatRecord<number>, unknown>>}
 */
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  }
}, {timestamps: true});

mongoose.model('User', AccountSchema);
