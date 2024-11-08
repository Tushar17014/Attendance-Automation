import React from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent() {
    const data01 = [
        {
            "name": "Present",
            "value": 56,
            fill: "#4846D2",
        },
        {
            "name": "Absent",
            "value": 44,
            fill: "#ff0000",
        },
    ];
    return (
        <div className='border p-5 rounded-lg' style={{height: "22rem"}}>
            <ResponsiveContainer width={'100%'} height={300}>
                <h2 className='text-2xl font-bold'>Average Attendance</h2>
                <PieChart>
                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
