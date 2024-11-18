"use client"
import React, { useEffect, useState } from 'react'
import StudentAttendanceList from './_components/studentAttendanceList';
import { getCourseDetailsArray } from '@/apis/courses';
import { useSelector } from 'react-redux';
import { getAttendanceByCourseEnroll } from '@/apis/attendance';
import { getStudentByEnroll } from '@/apis/student';
import moment from 'moment/moment'
import ClassSelection from '@/app/base/_components/ClassSelection';

function CheckAttendance() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [present, setPresent] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [showAttendance, setShowAttendance] = useState(false);

  const student = useSelector((state) => state.students.studentDetails)

  useEffect(() => {
    if (student) {
      let temp = [];
      student?.courses?.forEach(courseObject => {
        temp.push(courseObject);
      })
      setCoursesIDArray(temp);
    }
  }, [student])

  useEffect(() => {
    if (coursesIDArray) {
      const fetchData = async () => {
        const response = await getCourseDetailsArray(coursesIDArray);
        let temp = [];
        Object.values(response).forEach(courseObj => {
          if (coursesIDArray.includes(courseObj.cid)) {
            temp.push(courseObj);
          }
        })
        setCoursesArray(temp);
      }
      fetchData();
    }
  }, [coursesIDArray])

  useEffect(() => {
    if (selectedCourse) {
      const fetchData = async () => {
        const response = await getAttendanceByCourseEnroll(selectedCourse, student.enroll);
        let arr = [];
        let count = 1;
        let presentCount = 0;
        response?.forEach(obj => {
          arr.push({
            sno: count,
            Date: moment(obj.date).format('DD MMM YY'),
            Status: obj.status ? "Present" : "Absent",
            Ctype: "Regular"
          })
          count += 1;
          if(obj.status){
            presentCount += 1;
          }
        })
        setAttendanceData(arr);
        setTotalClasses(arr.length);
        setPresent(presentCount);
        if(arr.length > 0){
          setShowAttendance(true);
        }
      };
      fetchData();
    }
  }, [selectedCourse]);


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Select Course: </label>
          {coursesArray ?
            <ClassSelection selectedClass={setSelectedCourse} classes={coursesArray} />
            :
            <ClassSelection selectedClass={setSelectedCourse} classes={[{ name: "" }]} />
          }
        </div>
      </div>
      {showAttendance && (
        <div className='flex gap-10'>
            <h2 className='text-xl pl-5 mb-3'>Attendance: {
              present ? ((present/totalClasses)*100).toFixed(1) : 0
            }%</h2>
            <h2 className='text-xl pl-5 mb-3'>Classes Attendend: {present}</h2>
            <h2 className='text-xl pl-5 mb-3'>Total Classes: {totalClasses}</h2>
        </div>
      )}
      <div>
        <StudentAttendanceList attendanceData={attendanceData} />
      </div>
    </div>
  )
}

export default CheckAttendance
