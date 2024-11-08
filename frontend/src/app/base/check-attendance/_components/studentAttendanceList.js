import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import '../../_components/scrollbar.css'

function StudentAttendanceList({ attendanceData }) {
    const [attendanceDataML, setAttendanceDataML] = useState([
        { date: "1 Nov", status: true },
        { date: "2 Nov", status: false },
        { date: "3 Nov", status: false },
        { date: "4 Nov", status: true },
        { date: "5 Nov", status: true },
        { date: "6 Nov", status: false },
        { date: "7 Nov", status: true },
        { date: "8 Nov", status: false },
        { date: "9 Nov", status: true },
        { date: "10 Nov", status: true },
    ]);
    const handleCheckboxChange = (index) => {
        setAttendanceDataML((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, status: !item.status } : item
            )
        );
    };
    return (
        <div className='py-5 rounded-lg border'>
            <div className='h-96 overflow-y-auto scrollbar-custom px-5'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceDataML.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.date}</TableCell>
                                    <TableCell>{item.status ? 'Present' : 'Absent'}</TableCell>
                                    <TableCell><Checkbox checked={item.status} onClick={() => handleCheckboxChange(index)} /></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default StudentAttendanceList
