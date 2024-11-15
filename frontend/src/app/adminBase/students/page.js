"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ListTable from '../_components/listTable';

function Students() {
  const studentsList = useSelector((state) => state.students.allStudents);

  const colDef = [
    { field: "enroll", filter: true },
    { field: "name", filter: true },
    { field: "gender", filter: true },
    { field: "batch", filter: true },
    { field: "semester", filter: true },
  ];

  return (
    <div>
      {studentsList ?
      <ListTable colDef={colDef} data={studentsList} title="Students" />
      :
      <h1></h1>
      }
    </div>
  )
}

export default Students
