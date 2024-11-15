import React from 'react'
import './css/success.css'

function SuccessAnimation({content}) {
    return (
        <div className='h-96 flex justify-center items-center flex-col'>
            <video autoPlay muted onEnded={() => window.location.reload()} src="../success.webm" className='w-72' />
            <h2 className='text-primary text-2xl typewriter'>{content}</h2>
        </div>
    )
}

export default SuccessAnimation
