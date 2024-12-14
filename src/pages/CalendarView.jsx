import axios from "axios";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, getDay } from "date-fns";
import { useEffect, useState } from "react";
import { BsCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: ""
  });

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleAddEvent = async () => {
    try {
      const response = await axios.post("/events", newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ title: "", start: "", end: "" });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const firstDayOfWeek = getDay(firstDayOfMonth);
  
  const emptyCells = Array.from({ length: firstDayOfWeek }, (_, index) => (
    <div key={`empty-${index}`} className="p-1 border-t border-r"></div>
  ));

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto my-8 p-8">
      {/* Event Creation Form */}
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Event</h2>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Add Title" 
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="datetime-local" 
            value={newEvent.start}
            onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="datetime-local" 
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleAddEvent}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-2xl">
        {/* Header with month navigation */}
        <div className="flex items-center justify-between p-6 border-b">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setCurrentMonth((prevMonth) => addMonths(prevMonth, -1))}
          >
            <BsCaretLeftFill className="text-gray-600 text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {format(currentMonth, "MMMM yyyy")}
          </h1>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setCurrentMonth((prevMonth) => addMonths(prevMonth, 1))}
          >
            <BsFillCaretRightFill className="text-gray-600 text-xl" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="border-l">
          {/* Days of week header */}
          <div className="grid grid-cols-7 border-b">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2 px-4 text-sm font-semibold text-gray-600 text-center border-r">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {emptyCells.concat(
              daysInMonth.map((date) => (
                <div
                  key={date.toISOString()}
                  className={`min-h-[120px] p-4 border-b border-r relative transition-all
                    ${
                      selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleDateClick(date)}
                >
                  <span className={`text-sm ${
                    format(date, "MM") !== format(currentMonth, "MM")
                      ? "text-gray-400"
                      : "text-gray-700"
                  }`}>
                    {format(date, "d")}
                  </span>
                  <div className="mt-2 space-y-1">
                    {events
                      .filter(
                        (event) =>
                          format(new Date(event.start), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                      )
                      .map((event) => (
                        <Link
                          key={event._id}
                          to={"/event/" + event._id}
                          className="block text-xs p-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors truncate"
                        >
                          {event.title}
                        </Link>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
