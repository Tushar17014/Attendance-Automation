import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({ totalPresent, totalClasses }) {
    if (totalClasses == 0) {
        return (
            <div className='border p-5 rounded-lg h-80'>
                <ResponsiveContainer width="100%" height={300}>
                    <h2 className="text-2xl font-bold">Attendance</h2>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-3xl">No Data Found</h1>
                    </div>
                </ResponsiveContainer>

            </div>
        )
    }
    const presentPer = (totalPresent / totalClasses) * 100
    const data01 = [
        {
            "name": "Present",
            "value": parseFloat(presentPer.toFixed(1)),
            fill: "#4846D2",
        },
        {
            "name": "Absent",
            "value": parseFloat((100 - presentPer).toFixed(1)),
            fill: "#ff0000",
        },
    ];
    return (
        <div className='border p-5 rounded-lg h-80'>
            <ResponsiveContainer width={'100%'} height={300}>
                <h2 className='text-2xl font-bold'>Attendance</h2>
                <PieChart>
                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
