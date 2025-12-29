import React from 'react'

const EventCard = ({cardData}) => {
  return (
    <div className='bg-white  shadow-sm rounded-md w-full p-4'>
        <div>
            <h2 className='font-bold '>{cardData.name}</h2>
            <p>{cardData.event_type}</p>
            <p>{cardData.source_language}</p>
            <div className='flex items-center gap-4'>
                <p>{cardData.start_date}</p>
                <p>{cardData.start_time}</p>
            </div>
            <div className='flex items-center gap-4'>
                <p>{cardData.end_date}</p>
                <p>{cardData.end_time}</p>
            </div>
            <p>{cardData.location}</p>
        </div>
    </div>
  )
}

export default EventCard