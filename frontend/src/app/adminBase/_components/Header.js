"use client"
import { Search, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { getAllTeachers } from '@/apis/teacher';
import { useDispatch } from 'react-redux';
import { getAllTeacherDetailsRedux } from '@/store/teacherSlice';
import { useRouter } from 'next/navigation';
import { getAllStudents } from '@/apis/student';
import { getAllStudentsRedux } from '@/store/studentSlice';
import { getAllCourses } from '@/apis/courses';
import { getAllCoursesRedux } from '@/store/courseSlice';


function AdminHeader() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const UID = localStorage.getItem('uid');
      try {
        if (!UID || UID != 'admin') {
          router.push('/');
        }
        else {
          const allTeachers = await getAllTeachers();
          const allStudents = await getAllStudents();
          const allCourses = await getAllCourses();

          dispatch(getAllTeacherDetailsRedux(allTeachers));
          dispatch(getAllStudentsRedux(allStudents));
          dispatch(getAllCoursesRedux(allCourses));
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uid');
    router.push('/');
  }

  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
      <div className='p-2 rounded-lg border shadow-sm flex gap-2 w-full max-w-[900px]'>
        <Search />
        <input type='text' placeholder='Search Enrollment..' className='outline-none w-full' onChange={(event) => setSearchInput(event.target.value)} />
      </div>

      <Popover>
        <PopoverTrigger>
          <div className='flex gap-2 items-center'>
            <User />
            <div>
              <h2 className='font-bold'>Admin</h2>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Button className='w-full' onClick={handleLogout}>Logout</Button>
        </PopoverContent>
      </Popover>

    </div>
  )
}

export default AdminHeader
