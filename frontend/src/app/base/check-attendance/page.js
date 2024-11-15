"use client"
import React, { useEffect, useState } from 'react'
import StudentAttendanceList from './_components/studentAttendanceList';
import { getCourseDetailsArray } from '@/apis/courses';
import { useSelector } from 'react-redux';
import ClassSelection from '../_components/ClassSelection';
import { getAttendanceByCourse } from '@/apis/attendance';
import { getStudentByEnroll } from '@/apis/student';
import moment from 'moment/moment'

function CheckAttendance() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);

  const teacherDetails = useSelector((state) => state.teacherDetails.data);

  useEffect(() => {
    if (teacherDetails) {
      let temp = [];
      teacherDetails.courses?.forEach(courseObject => {
        temp.push(courseObject);
      })
      setCoursesIDArray(temp);
    }
  }, [teacherDetails]);

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
        const response = await getAttendanceByCourse(selectedCourse);
        const updatedResponse = await Promise.all(
          response.map(async (obj) => {
            const stu = await getStudentByEnroll(obj.enroll);
            return { ...obj, name: stu.name };
          })
        );
        setAttendance(updatedResponse);
      };
      fetchData();
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (attendance) {
      const fetchData = async () => {
        let arr = [];
        attendance?.forEach(obj => {
          let d = { enroll: obj.enroll, name: obj.name };
          obj.attendanceRecords?.forEach(rec => {
            d[moment(rec.date).format('DD MMM YY')] = rec.status ? "Present" : "Absent";
          })
          arr.push(d);
        })
        setAttendanceData(arr);
      };
      fetchData();
    }
  }, [attendance]);


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
      <div>
        <StudentAttendanceList attendanceData={attendanceData} />
      </div>
    </div>
  )
}

export default CheckAttendance
