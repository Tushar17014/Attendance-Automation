const { Respond } = require('../../utils/ExpressUtil');
const attendanceRef = require('../../models/attendance');
const teacherRef = require('../../models/teacherData');

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

async function takeAttendanceDataUpload(req, res) {
    try {
        const imagePath = path.join(__dirname, req.file.path);

        // Send the image to the Python server
        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));

        const response = await axios.post('http://localhost:5000/predict', formData, {
            headers: formData.getHeaders(),
        });

        // Clean up the uploaded file
        fs.unlinkSync(imagePath);

        // Send back the response to the frontend
        res.json({ names: response.data.names });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
}



module.exports = { getAttendanceByEnroll, getAttendanceByCourse, getAttendanceByTeacher, getAttendanceByCourseDate, takeAttendanceDataUpload };