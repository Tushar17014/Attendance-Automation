import React from 'react'
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList() {
    const totalStudent = 30;
    const totalPresent = 56;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title='Total Student' value={totalStudent}/>
      <Card icon={<TrendingUp />} title='Total Present' value={totalPresent.toFixed(1)+'%'}/>
      <Card icon={<TrendingDown />} title='Total Absent' value={(100 - totalPresent).toFixed(1)+'%'}/>
    </div>
  )
}

export default StatusList
