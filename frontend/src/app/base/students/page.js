"use client"
import React, { useEffect, useState } from 'react'
import StudentListTable from './_components/StudentListTable'
import { getAllStudents } from '@/apis/student';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentsRedux } from '@/store/studentSlice';

function Students() {
  const dispatch = useDispatch();
  const studentsListRedux = useSelector((state) => state.students.allStudents);
  const [studentsList, setStudentsList] = useState(studentsListRedux);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllStudents();
      dispatch(getAllStudentsRedux(response));
      setStudentsList(response);
    };
    if(!studentsListRedux){
      fetchData();
    }
  }, [studentsListRedux]);

  return (
    <div>
      {studentsList ?
      <StudentListTable data={studentsList} />
      :
      <h1>No Data Found</h1>
      }
    </div>
  )
}

export default Students
