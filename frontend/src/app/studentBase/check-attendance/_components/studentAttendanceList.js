"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function StudentAttendanceList({ attendanceData }) {
    const colDef = [
        {field: "sno", width: 300, headerName: "S.No"},
        {field: "Date", width: 300},
        {field: "Status", width: 300},
        {field: "Ctype", width: 300, headerName: "Class Type"},
    ];
    
    return (
        <div>
            {attendanceData && (
                
                <div
                    className="ag-theme-quartz"
                    style={{ height: 500 }}
                >
                    <AgGridReact
                        rowData={attendanceData}
                        columnDefs={colDef}
                        defaultColDef={{width: 100}}
                    />
                </div>
            )}
        </div>
    )
}

export default StudentAttendanceList
