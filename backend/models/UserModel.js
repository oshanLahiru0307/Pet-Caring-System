const moongoose = require('mongoose');

const Schema = moongoose.Schema;

const UserSchema = new Schema({
   name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = moongoose.model('User', UserSchema);