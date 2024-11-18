import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import '../../_components/css/scrollbar.css'

function AllCourses({ records }) {
    return (
        <div className='p-5 border rounded-lg shadow-sm overflow-y-auto scrollbar-custom h-80'>
            <h2 className='text-xl mb-3'>Courses</h2>
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Credits</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {records?.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{item.cid}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.credit}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllCourses
