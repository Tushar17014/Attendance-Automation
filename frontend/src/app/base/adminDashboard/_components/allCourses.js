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

function AllCourses() {
    return (
        <div className='p-5 border rounded-lg shadow-sm overflow-y-auto scrollbar-custom h-80'>
            <h2 className='text-xl mb-3'>Courses</h2>
            <Table >
                <TableBody>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ML01</TableCell>
                        <TableCell>Machine Learning</TableCell>
                        <TableCell>Nikhil Gupta</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default AllCourses
