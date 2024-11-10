const mongoose = require('mongoose');

const teacherDataSchema = new mongoose.Schema({
  uid: String,
  password: String,
  name: String,
  courses: Array,
  timetable: Object
});

module.exports = mongoose.model('TeacherData', teacherDataSchema, 'TeacherData');
