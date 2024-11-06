import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponent({ totalStudent, totalPresentData }) {
    const [data, setData] = useState([]);
    useEffect(()=>{
        formatData();
    },[totalPresentData || totalStudent])
    const formatData = () => {
        const result = totalPresentData.map((item=>({
            day: item.day,
            presentCount: item.presentCount,
            absentCount: item.absentCount
        })));
        setData(result);
    }
    return (
        <div className='p-5 border rounded-lg shadow-sm'>
            <h2 className='my-2 font-bold text-lg'>Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presentCount" name="Total Present" fill="#4846D2" />
                    <Bar dataKey="absentCount" name="Total Absent" fill="#ff0000" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarChartComponent
