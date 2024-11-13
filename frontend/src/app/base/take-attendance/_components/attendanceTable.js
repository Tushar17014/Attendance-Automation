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



function AttendanceTable({ attendanceData, records }) {
    const [attendanceDataML, setAttendanceDataML] = useState(records);
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = attendanceDataML.map((item) => ({
            enroll: item.enroll,
            status: item.status,
        }));
        attendanceData(result)
    }
    const handleCheckboxChange = (index) => {
        const updatedData = [...attendanceDataML];
        updatedData[index].status = !updatedData[index].status;
        setAttendanceDataML(updatedData);
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
                                        <TableCell className="font-medium">{item.enroll}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.batch}</TableCell>
                                        <TableCell className="text-right">
                                            <Checkbox checked={item.status} onClick={() => handleCheckboxChange(index)} />
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
