"use client"
import React, { useEffect, useState } from 'react'

function CourseSelection({selectedCourse, availableCourses}) {
    if(!availableCourses){
        availableCourses = [
            { Course: "Maths" },
            { Course: "English" },
            { Course: "ML" },
            { Course: "DL" },
            { Course: "NLP" },
        ];
    }
    useEffect(()=>{
        selectedCourse(availableCourses[0].Course);
    }, [])
    return (
        <div>
            <select className='p-3 border rounded-lg' onChange={(e)=>selectedCourse(e.target.value)}>
                {availableCourses.map((item, index)=>(
                    <option key={index} value={item.Class}>{item.Course}</option>
                ))}
            </select>
        </div>
    )
}

export default CourseSelection
