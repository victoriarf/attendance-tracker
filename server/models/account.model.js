var mongoose = require('mongoose');

/**
 * Account is a user who has registered
 * User though is a parent or a child, added in the application
 * TODO: instead of account & user -> User & Person
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
