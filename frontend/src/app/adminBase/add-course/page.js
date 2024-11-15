"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BeatLoader } from 'react-spinners';
import SuccessAnimation from '@/app/base/_components/successAnimation';
import { addCourse } from '@/apis/courses';

function AddCourse() {
    const [cid, setCid] = useState(null);
    const [cidError, setCidError] = useState(false);
    const [name, setName] = useState(null);
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const allCourses = useSelector((state) => state.course.allCourses);

    const handleCidChange = (value) => {
        if (value.length >= 4) {
            if (allCourses) {
                for (let i in allCourses) {
                    if (allCourses[i].cid == value) {
                        setCidError(true);
                        break;
                    }
                }
            }
            setCid(value);
        }
    }
    const handleDepartmentChange = (value) => {
        setDepartment(value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (cidError) {
            alert("Invalid Course ID")
        }
        else {
            try {
                const response = await addCourse({ cid: cid, name: name, department: department.value });
                setSuccess(true);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setLoading(false);
    }

    const depratmentOptions = [
        {value: "Mathematics", label: "Mathematics"},
        {value: "Physics", label: "Physics"},
        {value: "Computer Science", label: "Computer Science"}
    ]

    return (
        <div className='p-10'>
            {loading ?
                <div className='flex justify-center items-center h-96 mt-12'>
                    <BeatLoader size={20} color='#4846d2' />
                </div>
                :
                <div>
                    {success ?
                        <div>
                            <SuccessAnimation content='Course Added Successfully' />
                        </div>
                        :
                        <div>
                            <h2 className='text-2xl font-bold'>Add Course</h2>
                            <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                                <div className='gap-5 my-5 p-5 border rounded-lg shadow-sm grid grid-cols-3'>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>Code: </label>
                                        <Popover open={cidError}>
                                            <PopoverTrigger asChild>
                                                <Input placeholder='Enter Course Code...' type='text' onChange={(e) => handleCidChange(e.target.value)} required onFocus={() => setCidError(false)} />
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-red-100 text-red-700 p-2 rounded shadow">
                                                Course Already Exists.
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>Name: </label>
                                        <Input placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-24'>Department: </label>
                                        <Select
                                            className='w-80'
                                            options={depratmentOptions}
                                            onChange={handleDepartmentChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default AddCourse
