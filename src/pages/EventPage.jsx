import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";
import { UserContext } from "../UserContext";
import { useContext } from "react";
export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user} = useContext(UserContext);
  const [isBooking, setIsBooking] = useState(false);

  const navigate = useNavigate();
  // Fetching the event data from server by ID
  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:4000/event/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, [id]);

  // Copy Functionalities
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(linkToShare);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };

  const handleBookNow = async() => {
    if (!user) {
      navigate("/login");
    }
    setIsBooking(true);
    try { 
      await axios
        .post("/rsvp", {
          userId: user?.id,
          eventId: event.id,
          rsvpDate: event.event_date.split('T')[0]
        })
        .then((response) => {
          setIsBooking(false);
          alert(response.data.message);
        })
        .catch((error) => {
          setIsBooking(false);
          console.error("Error fetching events:", error);
        });
    } catch (error) {
      setIsBooking(false);
      console.error("Error fetching events:", error);
    }
  };

  if (!event) return <div className="text-center mt-20">Loading event details...</div>;

  return (
    <div className="flex flex-col mx-auto mt-5 max-w-4xl p-4 bg-white shadow-lg rounded-lg">
      <div>
        {event.image && (
          <img
            src={`http://localhost:4000/${event.image}`}
            alt="Event"
            className="w-full h-64 object-cover rounded-t-lg"
          />
        )}
      </div>

      <div className="flex justify-between mt-4 mx-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {event.event_name?.toUpperCase()}
        </h1>
      </div>

      <div className="mx-2 mt-4 text-md md:text-lg text-gray-700">
        {event.description}
      </div>

      <div className="mx-2 mt-4">
        <h2 className="text-md md:text-lg font-bold text-gray-800">When and Where</h2>
        <div className="mt-4 flex flex-row items-center gap-8">
          <div className="flex items-center gap-2">
            <AiFillCalendar className="w-6 h-6 text-gray-600" />
            <div className="flex flex-col">
              <h3 className="text-md md:text-lg font-bold text-gray-700">Date and Time</h3>
              <div className="text-sm md:text-base text-gray-600">
                Date: {event.event_date.split('T')[0] || "N/A"} <br />
                Time: {event.event_time || "N/A"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin className="w-6 h-6 text-gray-600" />
            <div className="flex flex-col">
              <h3 className="text-md md:text-lg font-bold text-gray-700">Location</h3>
              <div className="text-sm md:text-base text-gray-600">{event.location || "N/A"}</div>
            </div>

            <div>
              <button disabled={isBooking} onClick={handleBookNow} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {isBooking ? "Booking..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 mt-6 text-md md:text-lg font-bold text-gray-800">
        Share with friends
        <div className="mt-4 flex gap-6">
          <button onClick={handleCopyLink} className="text-gray-600 hover:text-gray-800">
            <FaCopy className="w-6 h-6" />
          </button>

          <button onClick={handleWhatsAppShare} className="text-gray-600 hover:text-gray-800">
            <FaWhatsappSquare className="w-6 h-6" />
          </button>

          <button onClick={handleFacebookShare} className="text-gray-600 hover:text-gray-800">
            <FaFacebook className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
