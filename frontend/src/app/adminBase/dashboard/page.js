"use client"
import React, { useEffect, useState } from 'react'
import CourseSelection from '../../base/_components/CourseSelection'
import StatusList from './_components/StatusList';
import { useSelector } from 'react-redux';
import { getAttendanceByCourse } from '@/apis/attendance';
import AllCourses from './_components/allCourses';
import BarChartComponent from '../../base/_components/BarChartComponent';

function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [totalStudents, setTotalStudents] = useState(null);
  const [totalTeachers, setTotalTeachers] = useState(null);
  const [totalCourses, setTotalCourses] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);

  const allTeachers = useSelector((state) => state.teacherDetails.data);
  const allStudents = useSelector((state) => state.students.allStudents);
  const allCourses = useSelector((state) => state.course.allCourses);

  useEffect(() => {
    if (allTeachers && allStudents && allCourses) {
      setTotalStudents(allStudents.length);
      setTotalTeachers(allTeachers.length);
      setTotalCourses(allCourses.length);
      setCoursesArray(allCourses);
      if (!selectedCourse) {
        setSelectedCourse(allCourses[0].cid);
      }

    }
  }, [allTeachers || allStudents || allCourses])

  useEffect(() => {
    if (coursesArray && selectedCourse) {
      const fetchData = async () => {
        const response = await getAttendanceByCourse(selectedCourse);
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
        }
        const result = response?.flatMap(entry => entry.attendanceRecords).reduce((acc, record) => {
          const date = formatDate(record.date);
          const existing = acc.find(item => item.name === date);
          if (existing) {
            record.status ? existing.Present++ : existing.Absent++;
          } else {
            acc.push({
              name: date,
              Present: record.status ? 1 : 0,
              Absent: record.status ? 0 : 1
            });
          }
          return acc; 
        }, []);
        setAttendanceData(result);
      };
      fetchData();
    }
  }, [selectedCourse, coursesArray])


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
      <StatusList totalStudent={totalStudents} totalCourses={totalCourses} totalTeachers={totalTeachers} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='p-5 border rounded-lg shadow-sm h-80'>
          <BarChartComponent data={attendanceData}/>
        </div>
        <div>
          <AllCourses records={allCourses}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
