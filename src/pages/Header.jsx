import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendar, FaUser, FaBell, FaSearch } from "react-icons/fa";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    try {
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold hover:text-pink-300 transition-colors">
              Campus Events
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/20 text-white placeholder-gray-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 w-64"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <FaSearch className="text-gray-300 hover:text-white" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <Link to="/calendar" className="nav-link flex items-center gap-1">
              <FaCalendar className="text-sm" />
              Calendar
            </Link>

            {user ? (
              <div className="relative">
                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  
                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 hover:bg-purple-600 px-3 py-2 rounded-lg transition-colors"
                    >
                      <FaUser className="text-sm" />
                      <span>{user.name}</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/useraccount"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          My Account
                        </Link>
                        {isAdmin && (
                          <>
                            <Link
                              to="/createEvent"
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                              Create Event
                            </Link>
                            <Link
                              to="/admin-dashboard"
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            >
                              Admin Dashboard
                            </Link>
                          </>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Search - Only shown on small screens */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </form>
      </div>
    </header>
  );
}

// Add these styles to your CSS
const styles = `
.nav-link {
  @apply hover:text-pink-300 transition-colors flex items-center;
}
`;
