import { CalendarDays, Clock, MapPin } from "lucide-react";

const modeColors = {
  "In-person": "bg-green-100 text-green-700",
  Virtual: "bg-blue-100 text-blue-700",
  Hybrid: "bg-purple-100 text-purple-700",
};

const EventCard = ({ cardData }) => {
  return (
    <div className="h-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col">
      
      {/* TOP */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            modeColors[cardData.event_type] || "bg-gray-100 text-gray-700"
          }`}
        >
          {cardData.event_type}
        </span>

        <span className="text-xs text-gray-500 capitalize">
          {cardData.source_language}
        </span>
      </div>

      {/* CONTENT (GROWS) */}
      <div className="flex-grow">
        <h2 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-3">
          {cardData.name}
        </h2>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>
              {cardData.start_date} – {cardData.end_date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>
              {cardData.start_time} – {cardData.end_time}
            </span>
          </div>

          {cardData.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="line-clamp-1">{cardData.location}</span>
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
