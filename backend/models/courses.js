const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
  cid: String,
  name: String,
  department: String,
  teacher: String,
  studentcount: Number
});

module.exports = mongoose.model('Courses', coursesSchema, 'Courses');
