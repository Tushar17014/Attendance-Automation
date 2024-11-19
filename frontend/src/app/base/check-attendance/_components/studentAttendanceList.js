"use client"
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function StudentAttendanceList({ attendanceData }) {
    const [colDef, setColDef] = useState(null);
    const [showData, setShowData] = useState(false);
    const [rowData, setRowData] = useState(null);
    
    useEffect(()=>{
        if(attendanceData){
            let temp = [];
            attendanceData?.forEach(ele =>{
                temp.push(Object.keys(ele))
            })
            temp = [...new Set(temp.flat())]
            let fieldArray = [];
            temp?.forEach(ele => {
                if(ele == 'name'){
                    fieldArray.push({field: ele, width: 130});
                }
                else if(ele == 'enroll'){
                    fieldArray.push({field: ele, sort: 'asc'});
                }
                else{
                    fieldArray.push({field: ele});
                }
            })
            setColDef(fieldArray);
            setRowData(attendanceData);
            setShowData(true);
        }
    }, [attendanceData])
    return (
        <div>
            {attendanceData && showData && (
                <div
                    className="ag-theme-quartz"
                    style={{ height: 500 }}
                >
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDef}
                        defaultColDef={{width: 100}}
                    />
                </div>
            )}
        </div>
    )
}

export default StudentAttendanceList
