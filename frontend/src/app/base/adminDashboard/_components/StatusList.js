import React from 'react'
import Card from '../../_components/Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ totalStudent, totalPresent }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title='Total Students' value={totalStudent} />
      <Card icon={<TrendingUp />} title='Total Courses' value={totalPresent} />
      <Card icon={<TrendingDown />} title='Total Teachers' value={totalStudent - totalPresent} />
    </div>
  )
}

export default StatusList
