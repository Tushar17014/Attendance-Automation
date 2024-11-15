import React from 'react'
import Card from '../../../base/_components/Card';
import { BookOpenText, GraduationCap, TrendingUp } from 'lucide-react';

function StatusList({ totalStudent, totalCourses, totalTeachers }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title='Total Students' value={totalStudent} />
      <Card icon={<BookOpenText />} title='Total Courses' value={totalCourses} />
      <Card icon={<TrendingUp />} title='Total Teachers' value={totalTeachers} />
    </div>
  )
}

export default StatusList
