"use client"
import React, { useEffect, useState } from 'react'
import CourseSelection from '../_components/CourseSelection'
import StatusList from './_components/StatusList';
import DateSelection, { formatDate } from '../_components/DateSelection';
import { useSelector } from 'react-redux';
import { getCourseDetailsArray } from '@/apis/courses';
import { getAttendanceByCourseDate } from '@/apis/attendance';
import AllCourses from './_components/allCourses';
import BarChartComponent from '../_components/BarChartComponent';

function AdminDashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [totalStudents, setTotalStudents] = useState(null);
  const [presentStudent, setPresentStudents] = useState(null);

  const teacherDetails = useSelector((state) => state.teacherDetails.data);

  useEffect(() => {
    if (teacherDetails) {
      let temp = [];
      teacherDetails?.courses?.forEach(courseObject => {
        temp.push(courseObject.cid);
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
        if(!selectedCourse){
          setSelectedCourse(temp[0].cid); 
        }
      }
      fetchData();
    }
  }, [coursesIDArray])


  useEffect(() => {
    if (selectedDate && coursesArray && selectedCourse) {
      const fetchData = async () => {
        const response = await getAttendanceByCourseDate(selectedCourse, selectedDate.isoDate);
        setPresentStudents(response?.filter(record => record.status).length || 0);
        setTotalStudents(response?.length || 0);
      };
      fetchData();
    }
  }, [selectedDate, selectedCourse, coursesArray])


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
      <StatusList totalStudent={totalStudents} totalPresent={presentStudent}/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='p-5 border rounded-lg shadow-sm h-80'>
          <BarChartComponent />  
        </div>
        <div>
          <AllCourses />  
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
