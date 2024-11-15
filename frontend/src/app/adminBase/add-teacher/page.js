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
import { addTeacher } from '@/apis/teacher';

function AddTeacher() {
    const [uid, setUid] = useState(null);
    const [uidError, setUidError] = useState(false);
    const [name, setName] = useState(null);
    const [courses, setCourses] = useState(null);
    const [courseOptions, setCourseOptions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const allTeachers = useSelector((state) => state.teacherDetails.data);
    const allCourses = useSelector((state) => state.course.allCourses);

    useEffect(() => {
        let temp = []
        allCourses?.forEach(obj => {
            temp.push({ value: obj.cid, label: obj.name });
        })
        setCourseOptions(temp);
    }, [allCourses])

    const handleUidChange = (value) => {
        if (value.length >= 6) {
            if (allTeachers) {
                for (let i in allTeachers) {
                    if (allTeachers[i].uid == value) {
                        setUidError(true);
                        break;
                    }
                }
            }
            setUid(value);
        }
    }
    const handleCourseChange = (value) => {
        let temp = [];
        value?.forEach(obj => {
            temp.push(obj.value);
        })
        setCourses(temp);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (uidError) {
            alert("Invalid Teacher ID")
        }
        else {
            try {
                const response = await addTeacher({ uid: uid, name: name, courses: courses });
                setSuccess(true);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setLoading(false);
    }
    const customStyles = {
        control: (provided) => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto',
        }),
        valueContainer: (provided) => ({
            ...provided,
            maxHeight: '190px',
            overflowY: 'auto',
        }),
    };
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
                            <SuccessAnimation content='Teacher Added Successfully' />
                        </div>
                        :
                        <div>
                            <h2 className='text-2xl font-bold'>Add Teacher</h2>
                            <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                                <div className='gap-5 my-5 p-5 border rounded-lg shadow-sm grid grid-cols-3'>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>UID: </label>
                                        <Popover open={uidError}>
                                            <PopoverTrigger asChild>
                                                <Input placeholder='Enter User ID...' type='text' onChange={(e) => handleUidChange(e.target.value)} required onFocus={() => setUidError(false)} />
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-red-100 text-red-700 p-2 rounded shadow">
                                                Teacher ID Already Exists.
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>Name: </label>
                                        <Input placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-20'>Courses: </label>
                                        <Select
                                            className='w-80'
                                            closeMenuOnSelect={false}
                                            options={courseOptions}
                                            isMulti
                                            onChange={handleCourseChange}
                                            styles={customStyles}
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

export default AddTeacher
