const { Respond } = require('../../utils/ExpressUtil');
const TeacherRef = require('../../models/teacherData')

async function test(req, res, next){
    try {
        const users = await TeacherRef.find();
        return Respond({
            res,
            status: 200,
            data: users
        });
    } catch (error) {
        console.log(error)
    }
    // const user = new User({
    //     uid:"Teach1",
    //     password:"teach@123",
    //     name:"Nikhil Gupta",
    //     courses: [
    //         {courseName: "Machine Learning", courseID: "ML01", batch: ["B1", "B2", "B3"]},
    //         {courseName: "Deep Learning", courseID: "DL01", batch: ["B1", "B2", "B3"]},
    //         {courseName: "Soft Computing", courseID: "SC01", batch: ["B4", "B5", "B6"]},
    //     ]
    // })
    // const data = await user.save();
    // res.send(data);
}

async function getAllTeachers(req, res, next){
    try {
        const data = await TeacherRef.find().lean();
        return Respond({
            res,
            status: 200,
            data: data
        });
    } catch (error) {
        console.log(error)
    }
}

async function getTeacherByUid(req, res, next){
    try {

        const data = await TeacherRef.findOne({uid: req.query.uid}).lean();
        
        return Respond({
            res,
            status: 200,
            data: data
        });
    } catch (error) {
        console.log(error)
    }
}

async function getTeacherTimetable(req, res, next){
    try {
        const data = await TeacherRef.findOne({uid:req.query.uid}, "timetable").lean();
        return Respond({
            res,
            status: 200,
            data: data.timetable
        });
    } catch (error) {
        console.log(error)
    }
}

async function getTeacherCourses(req, res, next){
    try {
        const data = await TeacherRef.findOne({uid:req.query.uid}, "courses").lean();
        return Respond({
            res,
            status: 200,
            data: data.courses
        });
    } catch (error) {
        console.log(error)
    }
}

async function addTeacher(req, res) {
    try {
        const { uid, name, courses } = req.body;

        const rec = new TeacherRef({ uid: uid, password: 'pass1', name: name, courses: courses})
        const data = await rec.save();
        return Respond({
            res,
            status: 200,
            data: data
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error Adding Teacher');
    }
}

module.exports = {getAllTeachers, test, getTeacherByUid, getTeacherTimetable, getTeacherCourses, addTeacher};