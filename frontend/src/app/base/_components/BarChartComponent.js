"use client"
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponent({ data }) {
  if (data?.length == 0 || !data) {
    return (
      <div>
        <ResponsiveContainer width="100%" height={260}>
          <h2 className="text-xl mb-3">Attendance Record</h2>
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl">No Data Found</h1>
          </div>
        </ResponsiveContainer>

      </div>
    )
  }
  return (
    <div>
      <h2 className='text-xl mb-3'>Attendance Record</h2>
      <ResponsiveContainer width={'100%'} height={260}>
        <BarChart width={730} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Present" fill="#4846D2" />
          <Bar dataKey="Absent" fill="#FF0000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent
