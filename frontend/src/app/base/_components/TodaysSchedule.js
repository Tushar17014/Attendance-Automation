import { SquareDashedBottomCode } from 'lucide-react';
import React from 'react'
import './css/scrollBar.css'

function TodaysSchedule() {
    const Schedule = [
        { startTime: "12:00 PM", endTime: "12:50 PM", subject: "Machine Learning", type: "Lecture", room: "CS2" },
        { startTime: "1:00 PM", endTime: "1:50 PM", subject: "Deep Learning", type: "Lecture", room: "CS1" },
        { startTime: "2:00 PM", endTime: "2:50 PM", subject: "Natural Language Processing ", type: "Lecture", room: "FF5" },
        { startTime: "3:00 PM", endTime: "3:50 PM", subject: "Maths", type: "Lecture", room: "G7" },
        { startTime: "4:00 PM", endTime: "4:50 PM", subject: "English", type: "Lecture", room: "G8" },
    ]
    return (
        <div className='p-5 border rounded-lg shadow-sm overflow-y-auto scrollbar-custom' style={{height: "22rem"}}>
            <h2 className='text-2xl font-bold mb-5'>Today's Schedule</h2>

            {Schedule.map((item, index) => (
                <div className='flex grid-cols-3 justify-between items-center mb-6' key={index}>
                    <div className='text-gray-500 w-40'>{item.startTime} - {item.endTime}</div>
                    <div className='flex mr-6'>
                        <div className='bg-purple-200 items-center text-center flex justify-center rounded-lg mx-4 px-3'>
                            <SquareDashedBottomCode className='size-8' />
                        </div>
                        <div>
                            {item.subject.length > 16 ? 
                                <div className="mt-1 mb-1 text-lg font-bold w-52 overflow-hidden relative">
                                    <div className="whitespace-nowrap transition-transform duration-300 ease-linear hover:animate-scroll">
                                        {item.subject}
                                    </div>
                                </div>
                            :
                                <div className='mt-1 mb-1 text-lg font-bold w-52'>
                                    {item.subject.length > 16 ? item.subject.substring(0, 16) + '...' : item.subject}
                                </div>

                            }
                            <div className='text-gray-500'>
                                {item.type}
                            </div>
                        </div>
                    </div>
                    <div className='text-lg font-bold'>
                        {item.room}
                    </div>
                </div>
            ))}
        </div>
    );


}

function Timetable() {
    const courses = [
        {
            title: 'Machine Learning',
            lesson: 4,
            duration: 50,
            time: '12:40 PM',
            date: 'Today 20.12',
            platform: 'Google Meet',
            lecturer: 'Paul Gorbachev',
        },
        {
            title: 'Machine Learning',
            lesson: 7,
            duration: 90,
            time: '12:40 PM',
            date: 'Today 20.12',
            platform: 'Google Meet',
            lecturer: 'Paul Gorbachev',
        },
        {
            title: 'Machine Learning',
            lesson: 2,
            duration: 45,
            time: '12:40 PM',
            date: 'Tomorrow 21.12',
            platform: 'Google Meet',
            lecturer: 'Paul Gorbachev',
        },
    ];

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">Timetable</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold">{course.title}</h3>
                            <span className="text-sm text-gray-500">Lesson {course.lesson}</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-500">{course.time}</p>
                            <p className="text-sm text-gray-500">{course.date}</p>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm text-gray-500">{course.platform}</p>
                            <p className="text-sm text-gray-500">Lecturer: {course.lecturer}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">Duration: {course.duration} min</p>
                            <div className="flex space-x-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5   
 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2M9   
 5a2 2 0 012 2h2M9 5a2 2 0 012 2h2" />
                                    </svg>
                                </button>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round"
                                            strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732   
 7.94 7.523 5 12 5c4.478 0 8.268 2.94 9.542 7-1.274 4.06-5.064 7-9.542 7-4.478 0-8.268-2.94-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodaysSchedule
