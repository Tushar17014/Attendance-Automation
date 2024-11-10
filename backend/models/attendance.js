const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    enroll: { type: Number, required: true },
    courses: [
        {
            cid: { type: String, required: true },
            attendanceRecords: [
                {
                    date: { type: Date, required: true },
                    status: { type: Boolean, required: true }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Attendance', attendanceSchema, 'Attendance');