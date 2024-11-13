const { Respond } = require('../../utils/ExpressUtil');
const attendanceRef = require('../../models/attendance');
const teacherRef = require('../../models/teacherData');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data')

async function getAttendanceByEnroll(req, res, next) {
    try {
        const data = await attendanceRef.findOne({ enroll: parseInt(req.query.enroll, 10) }).lean();
        return Respond({
            res,
            status: 200,
            data: data
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function getAttendanceByCourse(req, res, next) {
    try {
        const data = await attendanceRef.find().lean();
        const newdata = [];
        data?.forEach(x => {
            let d = {};
            let out = [];
            let flag = false;
            x.courses?.forEach(ele => {
                if (ele.cid == req.query.cid) {
                    out = ele.attendanceRecords;
                    flag = true;
                }
            })
            if (flag) {
                d.enroll = x.enroll
                d.attendanceRecords = out;
                newdata.push(d);
            }
        })
        return Respond({
            res,
            status: 200,
            data: newdata
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function getAttendanceByTeacher(req, res, next) {
    try {
        const attendanceData = await attendanceRef.find().lean();
        const teacherData = await teacherRef.findOne({ uid: req.query.teacherID }).lean();
        let teacherCourses = [];
        teacherData.courses?.forEach(data => {
            teacherCourses.push(data.cid);
        });
        let newData = [];
        attendanceData?.forEach(data => {
            let d = {};
            let out = [];
            let flag = false;
            data.courses?.forEach(data => {
                if (teacherCourses.includes(data.cid)) {
                    out.push({ cid: data.cid, attendanceRecords: data.attendanceRecords });
                    flag = true;
                }
            })
            if (flag) {
                d.enroll = data.enroll;
                d.courses = out;
                newData.push(d);
            }
        })
        return Respond({
            res,
            status: 200,
            data: newData
        });

    } catch (err) {
        console.error(err.message);
    }
}

async function getAttendanceByCourseDate(req, res, next) {
    try {
        const data = await attendanceRef.find().lean();
        const newdata = [];
        data?.forEach(x => {
            let d = {};
            let out = null;
            let flag = false;
            x.courses?.forEach(ele => {
                if (ele.cid == req.query.cid) {
                    for (let record in ele.attendanceRecords) {
                        if (ele.attendanceRecords[record].date == req.query.date) {
                            out = ele.attendanceRecords[record].status;
                            flag = true;
                            break;
                        }
                    }
                    ele.attendanceRecords?.forEach(record => {
                    })
                }
            })
            if (flag) {
                d.enroll = x.enroll;
                d.status = out;
                newdata.push(d);
            }
        })
        return Respond({
            res,
            status: 200,
            data: newdata
        });
    } catch (err) {
        console.error(err.message);
    }
}

async function takeAttendance(req, res) {
    try {
        if (!req.file) {
            console.error('No file received');
            return res.status(400).send('No file uploaded');
        }
        const targetDirectory = path.resolve(__dirname, '../../')
        const imagePath = path.join(targetDirectory, req.file.path);

        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));
        const response = await axios.post('http://localhost:5000/sendStudentAttendance', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        fs.unlinkSync(imagePath);

        return Respond({
            res,
            status: 200,
            data: response?.data
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
}

async function markAttendance(req, res) {
    const { enroll, cid, status } = req.body;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    console.log(today);
    try {
        const student = await attendanceRef.findOne({ enroll });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const course = student.courses.filter(course => course.cid == cid)[0];
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        const recordIndex = course.attendanceRecords.findIndex(record =>
            record.date === today
        );
        if (recordIndex !== -1) {
            course.attendanceRecords[recordIndex].status = status;
        } else {
            course.attendanceRecords.push({ date: today, status: status });
        }
        const response = await student.save();
        return Respond({
            res,
            status: 200,
            data: {success: true}
        });
    } catch (error) {
        console.error('Error Marking Attendance:', error);
        res.status(500).send('Error marking attendance');
    }
}



module.exports = { getAttendanceByEnroll, getAttendanceByCourse, getAttendanceByTeacher, getAttendanceByCourseDate, takeAttendance, markAttendance };