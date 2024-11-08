"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import ImageUploadComponent from './_components/ImageUploadComponent';
import ClassSelection from './_components/classSelection';
import AttendanceTable from './_components/attendanceTable';

function TakeAttendance() {
  const [selectedClass, setSelectedClass] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [attendanceData, setAttendanceData] = useState();
  const [showList, setShowList] = useState(false);

  const handleSubmit = () => {
    console.log(selectedClass);
    console.log(uploadedImage);
    setShowList(true);
  }

  useEffect(() => {
    console.log(attendanceData);
  }, [attendanceData])

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Take Attendance</h2>
      <div className='gap-5 my-5 p-5 border rounded-lg shadow-sm flex grid-cols-2'>
        <div>
          <div className='flex gap-2 items-center mb-5'>
            <label>Select Class: </label>
            <ClassSelection selectedClass={setSelectedClass}/>
          </div>
          <div>
            <ImageUploadComponent uploadedImage={setUploadedImage}/>
          </div>
          {uploadedImage && selectedClass && (
            <Button onClick={() => handleSubmit()}>Submit</Button>
          )}
        </div>
        {showList && (
          <div>
            <AttendanceTable attendanceData={setAttendanceData}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default TakeAttendance
