import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import '../../_components/scrollBar.css'
import { Button } from '@/components/ui/button';



function AttendanceTable({ attendanceData }) {
    const [attendanceDataML, setAttendanceDataML] = useState([
        { Enroll: "21103042", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: false },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: false },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: false },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: false },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
        { Enroll: "21103041", Name: "Tushar Sharma", Batch: "B2", Subject: "Maths", Status: true },
    ]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = attendanceDataML.map((item) => ({
            Enroll: item.Enroll,
            Name: item.Name,
            Batch: item.Batch,
            Subject: item.Subject,
            Status: item.Status,
        }));
        attendanceData(result)
    }
    const handleCheckboxChange = (index) => {
        setAttendanceDataML((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, Status: !item.Status } : item
            )
        );
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='h-96 overflow-y-auto scrollbar-custom px-5'>
                    <Table>
                        <TableCaption>A list of the students.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Enrollment</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendanceDataML.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.Enroll}</TableCell>
                                        <TableCell>{item.Name}</TableCell>
                                        <TableCell>{item.Batch}</TableCell>
                                        <TableCell className="text-right">
                                            <Checkbox checked={item.Status} onClick={() => handleCheckboxChange(index)} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </div>
                <div className='items-center flex justify-end w-full my-2'>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default AttendanceTable
