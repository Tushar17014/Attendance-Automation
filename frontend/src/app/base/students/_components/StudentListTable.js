"use client"
import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Search } from 'lucide-react';

function StudentListTable() {
  const [colDef, setColDef] = useState([
    { field: "Enroll", filter: true },
    { field: "Name", filter: true },
    { field: "Batch", filter: true },
    { field: "Subject", filter: true },
    { field: "Attendance", filter: true },
  ])

  const [rowData, setRowData] = useState([
    { Enroll: "21103042", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
    { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Attendance: "100" },
  ]);

  const [searchInput, setSearchInput] = useState();
  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl'>Students</h2>
      <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm my-7'>
        <Search />
        <input type='text' placeholder='Search...' className='outline-none w-full' onChange={(event)=>setSearchInput(event.target.value)}/>
      </div>
      <div
        className="ag-theme-quartz"
        style={{ height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          quickFilterText={searchInput}
          // pagination={true}
          // paginationPageSize={20}
          // paginationPageSizeSelector={[20, 50, 100]}
        />
      </div>
    </div>
  )
}

export default StudentListTable
