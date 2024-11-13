const { Respond } = require('../../utils/ExpressUtil');
const studentRef = require('../../models/studentData');
const studentEncodingsRef = require('../../models/studentEncodings');
const teacherRef = require('../../models/teacherData');

async function getAllStudents(req, res, next) {
    try {
        const data = await studentRef.find().lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function getStudentByEnroll(req, res, next) {
    try {
        const data = await studentRef.findOne({ enroll: req.query.enroll }).lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function getStudentByCourse(req, res, next) {
    try {
        const data = await studentRef.find().lean();
        let newData = [];
        data?.forEach(obj => {
            obj.courses?.forEach(course => {
                if (course == req.query.courseID) {
                    newData.push(obj);
                }
            })
        })
        return Respond({
            res,
            status: 200,
            data: newData
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function getStudentByTeacher(req, res, next) {
    try {
        const studentData = await studentRef.find().lean();
        const teacherData = await teacherRef.findOne({ uid: req.query.teacherID }).lean();
        let teacherCourses = [];
        teacherData.courses?.forEach(data => {
            teacherCourses.push(data.cid);
        });
        let newData = [];
        studentData?.forEach(studentObj => {
            for (course in studentObj.courses) {
                if (teacherCourses.includes(studentObj.courses[course])) {
                    newData.push(studentObj);
                    break;
                }
            }
        })
        return Respond({
            res,
            status: 200,
            data: newData
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function addStudentEncodings(req, res) {
    try {
        const enroll = parseInt(req.body.enroll);
        if (!req.file) {
            console.error('No file received');
            return res.status(400).send('No file uploaded');
        }
        const targetDirectory = path.resolve(__dirname, '../../')
        const imagePath = path.join(targetDirectory, req.file.path);

        const formData = new FormData();
        formData.append('image', fs.createReadStream(imagePath));
        const response = await axios.post('http://localhost:5000/sendStudentEncoding', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        const rec = new studentEncodingsRef({ enroll: enroll, encoding: response.data })
        const data = await rec.save();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
}


module.exports = { getAllStudents, getStudentByEnroll, getStudentByCourse, getStudentByTeacher, addStudentEncodings };