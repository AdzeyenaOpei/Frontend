import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className=" mx-auto px-4 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Upcoming Events
      </h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Filter by name or location"
          className="w-3/4 md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Available Seats:</strong> {event.availableSeats || "N/A"}
              </p>
              <Link to={`/event/${event.id}`}>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No events available.
          </p>
        )}
      </div>
    </div>
  );
}
