"use client"
import React, { useState } from 'react'
import CourseSelection from '../_components/CourseSelection'
import { Button } from '@/components/ui/button'
import SearchEnroll from '../_components/SearchEnroll';

function CheckAttendance() {
  const [selectedEnroll, setSelectedEnroll] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  const onSearchHandler = () => {
    console.log(selectedCourse);
    console.log(selectedEnroll);
  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Enter Enrollment: </label>
          <SearchEnroll selectedEnroll={(value) => setSelectedEnroll(value)}/>

        </div>
        <div className='flex gap-2 items-center'>
          <label>Select Course: </label>
          <CourseSelection selectedCourse={(value) => setSelectedCourse(value)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>
    </div>
  )
}

export default CheckAttendance
