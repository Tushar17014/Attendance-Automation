"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function ClassSelection({ selectedClass }) {
    const TimeTable = [
        { startTime: "12:00", endTime: "12:50", subject: "Machine Learning", type: "Lecture", room: "CS2" },
        { startTime: "1:00", endTime: "1:50", subject: "Deep Learning", type: "Lecture", room: "CS1" },
        { startTime: "2:00", endTime: "2:50", subject: "Natural Language Processing ", type: "Lecture", room: "FF5" },
        { startTime: "3:00", endTime: "3:50", subject: "Maths", type: "Lecture", room: "G7" },
        { startTime: "4:00", endTime: "4:50", subject: "English", type: "Lecture", room: "G8" },
    ]
    return (
        <div>
            <Select onValueChange={(value) => selectedClass(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={`${TimeTable[0].startTime} - ${TimeTable[0].endTime} ${TimeTable[0].subject}`} />
                </SelectTrigger>
                <SelectContent>
                    {TimeTable.map((item, index) => (
                        <SelectItem key={index} value={item.subject}>{item.startTime} - {item.endTime} {item.subject}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default ClassSelection
