import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

export default function EventForm() {
  const { user } = useContext(UserContext);
  // console.log(`user:`, user);
  const [formData, setFormData] = useState({
    user_id: user?.id,
    event_name: "",
    available_seats: "",
    event_date: "",
    event_time: "",
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  };

  const isValidTime = (timeStr) => {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to create an event");
      return;
    }

    if (!isValidDate(formData.event_date) || !isValidTime(formData.event_time)) {
      toast.error("Invalid date or time");
      return;
    } 
    // let data = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   data.append(key, value);
    // });
    // console.log(`data:`, formData);

    try {
      const response = await axios.post("/createEvent", formData);
      toast.success(response.data.message || "Event created successfully!");
      console.log("Event created successfully:", response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || "Failed to create event");
        console.error("Backend Error:", error.response.data.details);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Create an Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Event Name</label>
          <input
            type="text"
            name="event_name"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500"
            value={formData.event_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Event Date</label>
          <input
            type="date"
            name="event_date"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500"
            value={formData.event_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Event Time</label>
          <input
            type="time"
            name="event_time"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500"
            value={formData.event_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Available Seats</label>
          <input
            type="number"
            name="available_seats"
            min="0"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-500"
            value={formData.available_seats}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
