/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";

export default function IndexPage() {
  const [events, setEvents] = useState([]);

  //! Fetch events from the server ---------------------------------------------------------------
  useEffect(() => {
    axios
      .get("/createEvent")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  //! Like Functionality --------------------------------------------------------------
  const handleLike = (eventId) => {
    axios
      .post(`/event/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? { ...event, likes: event.likes + 1 }
              : event
          )
        );
        console.log("done", response);
      })
      .catch((error) => {
        console.error("Error liking ", error);
      });
  };

  return (
    <>
      <div className="flex flex-col mt-1">
        {/* Hero Section */}
        <div className="hidden sm:block">
          <div className="flex items-center inset-0">
            <img
              src="../src/assets/hero.jpg"
              alt="Hero"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Events Section */}
        <div className="mx-5 my-5 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Checking whether there is an event or not */}
          {events.length > 0 &&
            events.map((event) => {
              const eventDate = new Date(event.eventDate);
              const currentDate = new Date();

              //! Check if the event date is passed or not
              if (
                eventDate > currentDate ||
                eventDate.toDateString() === currentDate.toDateString()
              ) {
                return (
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg"
                    key={event._id}
                  >
                    <div className="rounded-t-xl overflow-hidden aspect-video relative">
                      {event.image && (
                        <img
                          src={`http://localhost:4000/api/${event.image}`}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        onClick={() => handleLike(event._id)}
                        className="absolute bottom-3 right-3 bg-white text-purple-600 p-2 rounded-full shadow-md hover:bg-gray-200"
                      >
                        <BiLike className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h1 className="font-bold text-lg mb-2">
                        {event.title.toUpperCase()}
                      </h1>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <div>
                          {event.eventDate.split("T")[0]}, {event.eventTime}
                        </div>
                        <div>
                          {event.ticketPrice === 0
                            ? "Free"
                            : `Rs. ${event.ticketPrice}`}
                        </div>
                      </div>
                      <p className="text-sm line-clamp-3 mb-4">
                        {event.description}
                      </p>
                      <div className="text-sm">
                        <p>
                          <span className="font-semibold">Organized By:</span> {" "}
                          {event.organizedBy}
                        </p>
                        <p>
                          <span className="font-semibold">Created By:</span> {" "}
                          {event.owner.toUpperCase()}
                        </p>
                      </div>
                      <Link
                        to={`/event/${event._id}`}
                        className="block mt-4 text-center bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg transition-all"
                      >
                        Book Ticket <BsArrowRightShort className="inline w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
    </>
  );
}
