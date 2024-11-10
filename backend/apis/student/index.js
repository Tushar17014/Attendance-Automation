const { Respond } = require('../../utils/ExpressUtil');
const studentRef = require('../../models/studentData');
const teacherRef = require('../../models/teacherData');

async function getAllStudents(req, res, next){
    try{
        const data = await studentRef.find().lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    }catch(err){
        console.error(err.message);
    }
}

async function getStudentByEnroll(req, res, next){
    try{
        const data = await studentRef.findOne({enroll: req.query.enroll}).lean();
        return Respond({
            res,
            status: 200,
            data: data
        })
    }catch(err){
        console.error(err.message);
    }
}

async function getStudentByCourse(req, res, next){
    try{
        const data = await studentRef.find().lean();
        let newData = [];
        data?.forEach(obj => {
            obj.courses?.forEach(course =>{
                if(course == req.query.courseID){
                    newData.push(obj);
                }
            })
        })
        return Respond({
            res,
            status: 200,
            data: newData
        })
    }catch(err){
        console.error(err.message);
    }
}

async function getStudentByTeacher(req, res, next){
    try{
        const studentData = await studentRef.find().lean();
        const teacherData = await teacherRef.findOne({uid: req.query.teacherID}).lean();
        let teacherCourses = [];
        teacherData.courses?.forEach(data => {
            teacherCourses.push(data.cid);
        });
        let newData = [];
        studentData?.forEach(studentObj => {
            for(course in studentObj.courses){
                if(teacherCourses.includes(studentObj.courses[course])){
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
    }catch(err){
        console.error(err.message);
    }
}

module.exports = {getAllStudents, getStudentByEnroll, getStudentByCourse, getStudentByTeacher};