import React from 'react'
import Card from '../../../base/_components/Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ totalPresent, totalClasses }) {
  let presentPer = (totalPresent/totalClasses)*100;
  if(totalClasses == 0){
    presentPer = 0;
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<TrendingUp />} title='Attendance' value={presentPer.toFixed(1) + '%'} />
      <Card icon={<GraduationCap />} title='Classes Attended' value={totalPresent} />
      <Card icon={<TrendingDown />} title='Classes Missed' value={totalClasses - totalPresent} />
    </div>
  )
}

export default StatusList
