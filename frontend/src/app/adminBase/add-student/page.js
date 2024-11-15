"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import ImageUploadComponent from './_components/ImageUploadComponent';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { addStudent, addStudentEncodings } from '@/apis/student';
const Select = dynamic(() => import('react-select'), { ssr: false });
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BeatLoader } from 'react-spinners';
import SuccessAnimation from '@/app/base/_components/successAnimation';

function AddStudent() {
    const [enroll, setEnroll] = useState(null);
    const [enrollError, setEnrollError] = useState(false);
    const [name, setName] = useState(null);
    const [batch, setBatch] = useState(null);
    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState(null);
    const [courses, setCourses] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [courseOptions, setCourseOptions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const allStudents = useSelector((state) => state.students.allStudents);
    const allCourses = useSelector((state) => state.course.allCourses);

    useEffect(() => {
        let temp = []
        allCourses?.forEach(obj => {
            temp.push({ value: obj.cid, label: obj.name });
        })
        setCourseOptions(temp);
    }, [allCourses])


    const handleEnrollChange = (value) => {
        if (value.length == 4) {
            if (allStudents) {
                for (let i in allStudents) {
                    if (allStudents[i].enroll == value) {
                        setEnrollError(true);
                        break;
                    }
                }
            }
            setEnroll(value);
        }
    }
    const handleGenderChange = (value) => {
        setGender(value.value);
    }
    const handleCourseChange = (value) => {
        let temp = [];
        value?.forEach(obj => {
            temp.push(obj.value);
        })
        setCourses(temp);
    }
    const handleImageSelect = (selectedImage) => {
        setUploadedImage(selectedImage);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (enrollError) {
            alert("Invalid Enroll")
        }
        else if (!uploadedImage) {
            alert("No Image")
        }
        else {
            const formData = new FormData();
            formData.append('image', uploadedImage);
            formData.append('enroll', enroll);
            try {
                const response = await addStudentEncodings(formData);
                const response2 = await addStudent({ enroll: enroll, name: name, batch: batch, gender: gender, dob: dob, courses: courses });
                setSuccess(true);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setLoading(false);
    }

    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
    ]
    const customStyles = {
        control: (provided) => ({
            ...provided,
            maxHeight: '80px',
            overflowY: 'auto',
        }),
        valueContainer: (provided) => ({
            ...provided,
            maxHeight: '70px',
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
                            <SuccessAnimation content='Student Added Successfully' />
                        </div>
                        :
                        <div>
                            <h2 className='text-2xl font-bold'>Add Student</h2>
                            <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                                <div className='gap-5 my-5 p-5 border rounded-lg shadow-sm grid grid-cols-3'>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>Enrollment: </label>
                                        <Popover open={enrollError}>
                                            <PopoverTrigger asChild>
                                                <Input placeholder='Enter Enrollment Number...' type='number' onChange={(e) => handleEnrollChange(e.target.value)} required onFocus={() => setEnrollError(false)} />
                                            </PopoverTrigger>
                                            <PopoverContent className="bg-red-100 text-red-700 p-2 rounded shadow">
                                                Enrollment Already Exists.
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>Name: </label>
                                        <Input placeholder='Enter Name...' onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-30'>Batch: </label>
                                        <Input placeholder='Enter Batch...' onChange={(e) => setBatch(e.target.value)} required />
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-20'>Sex: </label>
                                        <Select
                                            options={genderOptions}
                                            onChange={handleGenderChange}
                                            className='w-56'
                                            required
                                        />
                                    </div>
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-14'>DOB: </label>
                                        <Input type="date" onChange={(e) => setDob(e.target.value)} required />
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
                                    <div className='flex gap-2 items-center mb-5'>
                                        <label className='w-56'>Face Data: </label>
                                        <ImageUploadComponent uploadedImage={handleImageSelect} />
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

export default AddStudent
