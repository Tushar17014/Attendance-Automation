"use client"
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { addDays } from 'date-fns';
import moment from 'moment/moment';
import { Calendar } from "@/components/ui/calendar";


export function formatDate(selectedDate) {
    let isoDate = selectedDate;
    let day = 'Monday';
    if (selectedDate) {
        const date = new Date(selectedDate.toString().replace(/\s\([^)]+\)$/, ''));
        day = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
        // date.setUTCHours(0, 0, 0, 0);
        // isoDate = date.toISOString();
        isoDate = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date) + "T00:00:00.000Z";
    }
    return { day: day, isoDate: isoDate };
}

function DateSelection({ selectedDate }) {

    const nextDate = addDays(new Date(), 0);

    const [date, setDate] = useState(nextDate);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        selectedDate(formatDate(date))
    }, [date]);

    const handleDateSelect = (selectedDate) => {
        setDate(selectedDate);
        setIsOpen(false);
    };
    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex gap-2 items-center text-slate-500">
                        <CalendarDays className='h-5 w-5' />
                        {moment(date).format('DD MMM')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="flex flex-1 justify-center"
                    />
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default DateSelection
