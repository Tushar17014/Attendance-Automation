"use client"
import React, { useEffect, useState } from 'react'

function CourseSelection({selectedCourse, availableCourses}) {
    return (
        <div>
            {availableCourses ?
                <select className='p-3 border rounded-lg' onChange={(e)=>selectedCourse(e.target.value)}>
                    {availableCourses.map((item, index)=>(
                        <option key={index} value={item.cid}>{item.name}</option>
                    ))}
                </select>
                :
                <div>Loading</div>
            }
        </div>
    )
}

export default CourseSelection
