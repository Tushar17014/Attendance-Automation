const mongoose = require('mongoose');

const studentEncodingsSchema = new mongoose.Schema({
  enroll: Number,
  encoding: Array
});

module.exports = mongoose.model('StudentEncodings', studentEncodingsSchema, 'StudentEncodings');
