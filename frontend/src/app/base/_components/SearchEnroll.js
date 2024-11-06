"use client"
import React, { useEffect, useState } from 'react'

function SearchEnroll({ selectedEnroll }) {

    return (
        <div>
            <div className='p-2 rounded-lg border shadow-sm flex'>
                <input type='number' placeholder='Search...' className='outline-none w-full' onChange={(event) => selectedEnroll(event.target.value)} />
            </div>
        </div>
    )
}

export default SearchEnroll
