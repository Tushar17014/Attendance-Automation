"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import ImageUploadComponent from './_components/ImageUploadComponent';
import ClassSelection from '../_components/ClassSelection';
import AttendanceTable from './_components/attendanceTable';
import { getCourseDetailsArray } from '@/apis/courses';
import { useSelector } from 'react-redux';
import { getAttendanceByCourse, markAttendance, takeAttendance } from '@/apis/attendance';
import { getStudentByCourse } from '@/apis/student';
import { BeatLoader } from 'react-spinners';
import SuccessAnimation from '../_components/successAnimation';

function TakeAttendance() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [showList, setShowList] = useState(false);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [attendanceRec, setAttendanceRec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const teacherDetails = useSelector((state) => state.teacherDetails.data);

  useEffect(() => {
    if (teacherDetails) {
      const fetchData = async () => {
        let tempCourseIDArray = [];
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        teacherDetails.courses.forEach(courseObject => {
          tempCourseIDArray.push(courseObject);
        })
        let finalCourseIDArray = [];
        for(let cid in tempCourseIDArray){
          const prevAttendanceData = await getAttendanceByCourse(tempCourseIDArray[cid]);
          const attendanceRecord = prevAttendanceData[0]?.attendanceRecords;
          let flag = false;
          if(attendanceRecord){
            for(let obj in attendanceRecord){
              if(attendanceRecord[obj].date == today.toISOString()){
                flag = true;
                break;
              }
            }
          }
          if(!flag){
            finalCourseIDArray.push(tempCourseIDArray[cid]);
          }
        }
        setCoursesIDArray(finalCourseIDArray);
      };
      fetchData();
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
          setSelectedClass(temp[0]);
        }
      }
      fetchData();
    }
  }, [coursesIDArray]);

  useEffect(() => {
    if (attendanceData && selectedClass) {
      const postRecords = async () => {
        const response = await markAttendance(attendanceData, selectedClass);
      }
      postRecords();
      setSuccess(true);
    }
  }, [attendanceData]);

  const handleImageSelect = (selectedImage) => {
    setUploadedImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert("No Image")
    }
    const formData = new FormData();
    formData.append('image', uploadedImage);
    setShowList(true);
    try {
      const allStudents = await getStudentByCourse(selectedClass);
      const response = await takeAttendance(formData);
      let temp = [];
      allStudents.forEach(obj => {
        if (response.includes(obj.enroll)) {
          temp.push({ enroll: obj.enroll, name: obj.name, batch: obj.batch, status: true });
        }
        else {
          temp.push({ enroll: obj.enroll, name: obj.name, batch: obj.batch, status: false });
        }
      })
      setAttendanceRec(temp);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }



  return (
    <div className='p-10'>
      {showList ?
        <div>
          {loading && !attendanceRec ?
            <div className='flex justify-center items-center h-96 mt-12'>
              <BeatLoader size={20} color='#4846d2' />
            </div>
            :
            <div> 
              {success ? 
                <div> 
                  <SuccessAnimation content='Attendance Uploaded Successfully'/>
                </div> 
                :
                <div>
                  <h2 className='text-2xl font-bold'>Confirm Attendance</h2>
                  <AttendanceTable records={attendanceRec} attendanceData={setAttendanceData} />
                </div>
              }
            </div>
          }
        </div>
        :
        <div>
          <h2 className='text-2xl font-bold'>Take Attendance</h2>
          <div className='gap-5 my-5 p-5 border rounded-lg shadow-sm flex grid-cols-2'>
            <div>
              <div className='flex gap-2 items-center mb-5'>
                <label>Select Class: </label>
                {coursesArray ?
                  <ClassSelection selectedClass={setSelectedClass} classes={coursesArray} />
                  :
                  <ClassSelection selectedClass={setSelectedClass} classes={[{ name: "" }]} />
                }
              </div>
              <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                <div>
                  <ImageUploadComponent uploadedImage={handleImageSelect} />
                </div>
                {uploadedImage && selectedClass && (
                  <Button type="submit">Submit</Button>
                )}
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default TakeAttendance
