import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";

export default function EventForm() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user ? user.name : "",
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    image: null,
  });

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

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

    if (!isValidDate(formData.eventDate) || !isValidTime(formData.eventTime)) {
      toast.error("Invalid date or time");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axios.post("/createEvent", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
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
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Post an Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Organized By</label>
          <input
            type="text"
            name="organizedBy"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.organizedBy}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Event Date</label>
          <input
            type="date"
            name="eventDate"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Event Time</label>
          <input
            type="time"
            name="eventTime"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.eventTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 font-medium">Image</label>
          <input
            type="file"
            name="image"
            className="p-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageUpload}
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
