"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import ImageUploadComponent from './_components/ImageUploadComponent';
import ClassSelection from '../_components/ClassSelection';
import AttendanceTable from './_components/attendanceTable';
import { getCourseDetailsArray } from '@/apis/courses';
import { useSelector } from 'react-redux';

function TakeAttendance() {
  const [selectedClass, setSelectedClass] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [attendanceData, setAttendanceData] = useState();
  const [showList, setShowList] = useState(false);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);

  const teacherDetails = useSelector((state) => state.teacherDetails.data);

  useEffect(() => {
    if (teacherDetails) {
      let temp = [];
      teacherDetails.courses.forEach(courseObject => {
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
        if (!selectedClass) {
          setSelectedClass(temp[0].cid);
        }
      }
      fetchData();
    }
  }, [coursesIDArray])


  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', uploadedImage);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Detected Names:', data.names);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setShowList(true);
  }



  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Take Attendance</h2>
      <div className='gap-5 my-5 p-5 border rounded-lg shadow-sm flex grid-cols-2'>
        <div>
          <div className='flex gap-2 items-center mb-5'>
            <label>Select Class: </label>
            {coursesArray ?
              <ClassSelection selectedClass={setSelectedClass} classes={coursesArray}/>
              :
              <ClassSelection selectedClass={setSelectedClass} classes={[{ name: "abhjsd" }]} />
            }
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <ImageUploadComponent uploadedImage={setUploadedImage} />
            </div>
            {uploadedImage && selectedClass && (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </div>
        {showList && (
          <div>
            <AttendanceTable attendanceData={setAttendanceData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default TakeAttendance
