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


function DateSelection({ selectedDate }) {

    const nextDate = addDays(new Date(), 0);

    const [date, setDate] = useState(nextDate);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        selectedDate(date)
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
