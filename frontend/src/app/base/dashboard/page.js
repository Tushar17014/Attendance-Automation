"use client"
import React, { useState } from 'react'
import CourseSelection from '../_components/CourseSelection'
import StatusList from './_components/StatusList';
import BarChartComponent from '../_components/BarChartComponent';
import PieChartComponent from '../_components/PieChartComponent';
import DateSelection from '../_components/DateSelection';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const totalPresentData = [
    {day: 1, presentCount: 5, absentCount: 25},
    {day: 2, presentCount: 6, absentCount: 24},
    {day: 3, presentCount: 6, absentCount: 24},
    {day: 4, presentCount: 10, absentCount: 20},
    {day: 5, presentCount: 15, absentCount: 15},
  ]
  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <DateSelection selectedDate={(value) => setSelectedDate(value)}/>
          <CourseSelection selectedCourse={(value) => setSelectedCourse(value)} />
        </div>
      </div>
      <StatusList />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='md:col-span-2'>
          <BarChartComponent totalStudent={30} totalPresentData={totalPresentData} />
        </div>
        <div>
          <PieChartComponent />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
