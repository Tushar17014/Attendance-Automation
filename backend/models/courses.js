const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
  cid: String,
  name: String
});

module.exports = mongoose.model('Courses', coursesSchema, 'Courses');
