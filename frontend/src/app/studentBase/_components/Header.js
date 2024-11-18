"use client"
import { Search, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getStudentByEnroll } from '@/apis/student';
import { getStudentDetailsRedux } from '@/store/studentSlice';


function Header() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState();
  const [student, setStudent] = useState(null); 
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const enroll = localStorage.getItem('enroll');
      try {
        if(!enroll){
          router.push('/');
        }
        const student = await getStudentByEnroll(enroll);
        setStudent(student);
        dispatch(getStudentDetailsRedux(student));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('enroll');
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
              <h2 className='font-bold'>{student?.name}</h2>
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

export default Header
