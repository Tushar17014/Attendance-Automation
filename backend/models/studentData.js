const mongoose = require('mongoose');

const studentDataSchema = new mongoose.Schema({
  enroll: Number,
  name: String,
  gender: String,
  dob: Date,
  password: String,
  batch: String,
  courses: Array,
  semester: Number
});

module.exports = mongoose.model('StudentData', studentDataSchema, 'StudentData');
