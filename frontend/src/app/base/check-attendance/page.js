"use client"
import React, { useState } from 'react'
import CourseSelection from '../_components/CourseSelection'
import { Button } from '@/components/ui/button'
import SearchEnroll from '../_components/SearchEnroll';
import Card from '../_components/Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import PieChartComponent from '../_components/PieChartComponent';
import StudentAttendanceList from './_components/studentAttendanceList';

function CheckAttendance() {
  const [selectedEnroll, setSelectedEnroll] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState();
  const [showResults, setShowResults] = useState(false);
  const CoursesArray = [
    { Course: "Maths" },
    { Course: "English" },
    { Course: "ML" },
    { Course: "DL" },
    { Course: "NLP" },
  ];

  const onSearchHandler = () => {
    console.log(selectedCourse);
    console.log(selectedEnroll);
    setShowResults(true);
  }

  const totalClasses = 30;
  const totalPresent = 24;
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Enter Enrollment: </label>
          <SearchEnroll selectedEnroll={(value) => setSelectedEnroll(value)} />
        </div>
        {selectedEnroll && (
          <div className='flex gap-2 items-center'>
            <div className='flex gap-2 items-center'>
              <label>Select Course: </label>
              <CourseSelection selectedCourse={(value) => setSelectedCourse(value)} availableCourses={CoursesArray} />
            </div>
            <Button onClick={() => onSearchHandler()}>Search</Button>
          </div>
        )}
      </div>
      {showResults && (
        <div className='flex grid-cols-3 min-h-96 max-h-96 space-x-10'>
          <div className='grid-cols-1 space-y-4 min-h-96 max-h-96'>
            <Card icon={<GraduationCap />} title='Total Classes' value={totalClasses} />
            <Card icon={<TrendingUp />} title='Total Present' value={totalPresent} />
            <Card icon={<TrendingDown />} title='Total Absent' value={totalClasses - totalPresent} />
          </div>
          <div>
            <StudentAttendanceList />
          </div>
          <div>
            <PieChartComponent />
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckAttendance
