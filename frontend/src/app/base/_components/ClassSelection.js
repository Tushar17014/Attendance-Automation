"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function ClassSelection({ selectedClass, classes }) {
    const handleClassChange = (value) => {
        selectedClass(value);
    };
    return (
        <div>
            <Select onValueChange={handleClassChange} >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={"Select Class"} />
                </SelectTrigger>
                <SelectContent>
                    {classes.map((item, index) => (
                        <SelectItem key={index} value={item.cid}>{item.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default ClassSelection
