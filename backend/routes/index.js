var express = require('express');
var multer = require('multer');
const { getAllTeachers, getTeacherByUid, getTeacherTimetable, getTeacherCourses } = require('../apis/teacher');
const { getAllCourses, getCourseByID, getCourseByArrayID } = require('../apis/courses');
const { getAttendanceByEnroll, getAttendanceByCourse, getAttendanceByTeacher, getAttendanceByCourseDate, takeAttendanceDataUpload } = require('../apis/attendance');
const { getAllStudents, getStudentByEnroll, getStudentByCourse, getStudentByTeacher } = require('../apis/student');
var router = express.Router();

const upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Home Page");
});

//Teacher
router.get(
  '/getAllTeachers',
  getAllTeachers
);

router.get(
  '/getTeacherByUid',
  getTeacherByUid
);

router.get(
  '/getTeacherTimetable',
  getTeacherTimetable
);

router.get(
  '/getTeacherCourses',
  getTeacherCourses
);


//Students
router.get(
  '/getAllStudents',
  getAllStudents
);

router.get(
  '/getStudentByEnroll',
  getStudentByEnroll
);

router.get(
  '/getStudentByCourse',
  getStudentByCourse
);

router.get(
  '/getStudentByTeacher',
  getStudentByTeacher
);



//Courses
router.get(
  '/getAllCourses',
  getAllCourses
);

router.get(
  '/getCourseByID',
  getCourseByID
);

router.get(
  '/getCourseByArrayID',
  getCourseByArrayID
);




//Attendance
router.get(
  '/getAttendanceByEnroll',
  getAttendanceByEnroll
);

router.get(
  '/getAttendanceByCourse',
  getAttendanceByCourse
);

router.get(
  '/getAttendanceByTeacher',
  getAttendanceByTeacher
);

router.get(
  '/getAttendanceByCourseDate',
  getAttendanceByCourseDate
);

router.post(
  '/takeAttendanceDataUpload',
  upload.single('image'),
  takeAttendanceDataUpload
);


module.exports = router;
