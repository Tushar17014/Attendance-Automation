import React from 'react'
import Card from '../../_components/Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ totalStudent, totalPresent }) {
  const presentPer = (totalPresent / totalStudent)*100
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title='Total Students' value={totalStudent} />
      <Card icon={<TrendingUp />} title='Total Present' value={totalStudent == 0 ? 0 + '%': presentPer.toFixed(1) + '%'} />
      <Card icon={<TrendingDown />} title='Total Absent' value={totalStudent == 0 ? 0 + '%': (100 - presentPer).toFixed(1) + '%'} />
    </div>
  )
}

export default StatusList
