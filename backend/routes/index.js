var express = require('express');
var multer = require('multer');
const { getAllTeachers, getTeacherByUid, getTeacherTimetable, getTeacherCourses, addTeacher } = require('../apis/teacher');
const { getAllCourses, getCourseByID, getCourseByArrayID, addCourse } = require('../apis/courses');
const { getAttendanceByEnroll, getAttendanceByCourse, getAttendanceByTeacher, getAttendanceByCourseDate, takeAttendance, markAttendance } = require('../apis/attendance');
const { getAllStudents, getStudentByEnroll, getStudentByCourse, getStudentByTeacher, addStudentEncodings, addStudent } = require('../apis/student');
var router = express.Router();
const {upload} = require('../middlewares/uploadImage');
const { login, logout } = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Home Page");
});

router.post(
  '/login',
  login
)

router.post(
  '/logout',
  logout
)

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

router.post(
  '/addTeacher',
  addTeacher
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

router.post(
  '/addStudentEncodings',
  upload.single('image'),
  addStudentEncodings
);

router.post(
  '/addStudent',
  addStudent
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

router.post(
  '/addCourse',
  addCourse
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
  '/takeAttendance',
  upload.single('image'),
  takeAttendance
);

router.post(
  '/markAttendance',
  markAttendance
);


module.exports = router;
