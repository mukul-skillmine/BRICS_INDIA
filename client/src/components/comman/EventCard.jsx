import { CalendarDays, Clock, MapPin } from "lucide-react";

const modeColors = {
  "In-person": "bg-green-100 text-green-700",
  Virtual: "bg-blue-100 text-blue-700",
  Hybrid: "bg-purple-100 text-purple-700",
};

const EventCard = ({ cardData }) => {
  return (
    <div className='bg-white  shadow-sm rounded-md w-full p-4 hover:scale-105 duration-200 ease-in-out'>
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
          )}
        </div>
      </div>

      {/* ACTIONS (STICK TO BOTTOM) */}
      <div className="flex justify-end gap-4 pt-4 mt-auto">
        <button className="text-sm font-medium text-orange-600 hover:underline">
          View
        </button>
        <button className="text-sm font-medium text-gray-600 hover:underline">
          Edit
        </button>
      </div>
    </div>
  );
};

export default EventCard;
