"use client"
import React, { useEffect, useState } from 'react'
import CourseSelection from '../../base/_components/CourseSelection'
import StatusList from './_components/StatusList';
import { useSelector } from 'react-redux';
import { getAttendanceByCourseEnroll } from '@/apis/attendance';
import AllCourses from './_components/allCourses';
import BarChartComponent from '../../base/_components/BarChartComponent';
import { getCourseDetailsArray } from '@/apis/courses';
import PieChartComponent from '../_components/PieChartComponent';

function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [totalClasses, setTotalClasses] = useState(null);
  const [totalPresent, setTotalPresent] = useState(null);

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
        if (!selectedCourse) {
          setSelectedCourse(temp[0].cid);
        }
      }
      fetchData();
    }
  }, [coursesIDArray])

  useEffect(() => {
    if (coursesArray && selectedCourse) {
      const fetchData = async () => {
        console.log(selectedCourse);
        const response = await getAttendanceByCourseEnroll(selectedCourse, student.enroll);
        setTotalClasses(response.length);
        let present = 0;
        response?.forEach(obj => {
          if(obj.status){
            present += 1;
          }
        })
        setTotalPresent(present);
      };
      fetchData();
    }
  }, [selectedCourse || coursesArray])


  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          {coursesArray ?
            <CourseSelection selectedCourse={(value) => setSelectedCourse(value)} availableCourses={coursesArray} />
            :
            <CourseSelection selectedCourse={(value) => setSelectedCourse(value)} />
          }
        </div>
      </div>
      <StatusList totalPresent={totalPresent} totalClasses={totalClasses} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <AllCourses records={coursesArray} />
        </div>
        <div>
          <PieChartComponent totalPresent={totalPresent} totalClasses={totalClasses}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
