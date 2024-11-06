"use client"
import React, { useEffect, useState } from 'react'

function CourseSelection({selectedCourse}) {
    const CoursesArray = [
        {Course: "Maths"},
        {Course: "English"},
        {Course: "ML"},
        {Course: "DL"},
        {Course: "NLP"},
    ];
    const [Course, setCourse] = useState(CoursesArray);
    useEffect(()=>{
        selectedCourse(CoursesArray[0].Course);
    }, [])
    return (
        <div>
            <select className='p-3 border rounded-lg' onChange={(e)=>selectedCourse(e.target.value)}>
                {Course.map((item, index)=>(
                    <option key={index} value={item.Class}>{item.Course}</option>
                ))}
            </select>
        </div>
    )
}

export default CourseSelection
