"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ListTable from '../_components/listTable';

function Teachers() {

    const teachersListRedux = useSelector((state) => state.teacherDetails.data);
    const allCourses = useSelector((state) => state.course.allCourses);
    const [teachersList, setTeacherList] = useState(null);

    useEffect(()=>{
        if(teachersListRedux && allCourses){
            let lst = [];
            teachersListRedux?.forEach(obj => {
                let temp = [];
                obj.courses?.forEach(teacherCourse => {
                    const result = allCourses.find(course => course.cid.includes(teacherCourse));
                    temp.push(result.name);
                })
                lst.push({...obj, cname: temp});
            })
            setTeacherList(lst);
        }
    }, [teachersListRedux || allCourses])


    const colDef = [
        { field: "uid", filter: true, headerName: "Teacher ID" },
        { field: "name", filter: true },
        { field: "cname", filter: true, headerName: "Courses", width: 500 },
    ];

    return (
        <div>
            {teachersList ?
                <ListTable colDef={colDef} data={teachersList} title="Teachers" />
                :
                <h1></h1>
            }
        </div>
    )
}

export default Teachers
