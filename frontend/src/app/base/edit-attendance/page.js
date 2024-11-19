"use client"
import React, { useEffect, useState } from 'react'
import { getCourseDetailsArray } from '@/apis/courses';
import { useSelector } from 'react-redux';
import ClassSelection from '../_components/ClassSelection';
import { editAttendance, getAttendanceByCourseDate } from '@/apis/attendance';
import { getStudentByEnroll } from '@/apis/student';
import DateSelection from '../_components/DateSelection';
import EditAttendanceTable from './_components/editAttendanceTable';
import { BeatLoader } from 'react-spinners';
import SuccessAnimation from '../_components/successAnimation';

function EditAttendance() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [coursesIDArray, setCoursesIDArray] = useState(null);
  const [coursesArray, setCoursesArray] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [updatedAttendance, setUpdatedAttendance] = useState(null);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setShowData(false);
    setLoading(false);
    setSuccess(false);
    if (selectedCourse && selectedDate) {
      setShowData(true);
      setLoading(true);
      const fetchData = async () => {
        const response = await getAttendanceByCourseDate(selectedCourse, selectedDate.isoDate);
        const updatedResponse = await Promise.all(
          response.map(async (obj) => {
            const stu = await getStudentByEnroll(obj.enroll);
            return { ...obj, name: stu.name, batch: stu.batch };
          })
        );
        updatedResponse.sort((a, b) => a.enroll - b.enroll);
        setAttendance(updatedResponse);
        setLoading(false);
      };
      fetchData();
    }
  }, [selectedCourse, selectedDate]);

  useEffect(() => {
    if (updatedAttendance) {
      const postRecords = async () => {
        const response = await editAttendance(updatedAttendance, selectedCourse, selectedDate.isoDate);
      };
      postRecords();
      setSuccess(true);
    }
  }, [updatedAttendance])


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Edit Attendance</h2>
      <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
          <label>Select Date: </label>
          <DateSelection selectedDate={(value) => setSelectedDate(value)} />
        </div>
        <div className='flex gap-2 items-center'>
          <label>Select Course: </label>
          {coursesArray ?
            <ClassSelection selectedClass={setSelectedCourse} classes={coursesArray} />
            :
            <ClassSelection selectedClass={setSelectedCourse} classes={[{ name: "" }]} />
          }
        </div>
      </div>
      {showData && (
        <div>
          {loading && !attendance ?
            <div className='flex justify-center items-center h-96 mt-12'>
              <BeatLoader size={20} color='#4846d2' />
            </div>
            :
            <div>
              {success ?
                <div>
                  <SuccessAnimation content='Attendance Updated Successfully' />
                </div>
                :
                <div>
                  {attendance?.length > 0 && (
                    <EditAttendanceTable attendanceData={setUpdatedAttendance} records={attendance} />
                  )}
                </div>
              }
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default EditAttendance
