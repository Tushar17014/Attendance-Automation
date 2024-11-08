"use client"
import React, { useState } from 'react'

function SearchEnroll({ selectedEnroll }) {
    const [enroll, setEnroll] = useState();
    const handleSubmit = (e)=>{
        e.preventDefault();
        selectedEnroll(enroll);
    }
    return (
        <div>
            <div className='p-2 rounded-lg border shadow-sm flex'>
                <form onSubmit={handleSubmit}>
                    <input type='number' placeholder='Search...' className='outline-none w-full' onChange={(event) => setEnroll(event.target.value)} />
                </form>
            </div>
        </div>
    )
}

export default SearchEnroll
