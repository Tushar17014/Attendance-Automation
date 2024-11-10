"use client"
import { Search, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { getTeacherDetails } from '@/apis/teacher';
import { useDispatch } from 'react-redux';
import { getTeacherDetailsRedux } from '@/store/teacherSlice';


function Header() {
  const teacherID = "Teach1";
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState();
  const [teacherDetails, setTeacherDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeacherDetails(teacherID);
        if (!response) {
          throw new Error('Failed to Fetch');
        }
        setTeacherDetails(response);
        dispatch(getTeacherDetailsRedux(response));
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);
  

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
              <h2 className='font-bold'>{teacherDetails && (teacherDetails.name)}</h2>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Button className='w-full'>Logout</Button>
        </PopoverContent>
      </Popover>

    </div>
  )
}

export default Header
