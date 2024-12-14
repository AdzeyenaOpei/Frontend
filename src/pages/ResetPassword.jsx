// ResetPassword.js

import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div className="flex w-full h-screen justify-center items-center px-5">
      <div className="bg-white w-full max-w-md px-7 py-8 rounded-xl shadow-lg">
        <form
          className="flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            // Add reset password logic here
          }}
        >
          <h1 className="text-2xl font-bold mb-6 text-primarydark">Reset Password</h1>

          <div className="input mb-4 w-full relative">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primarylight"
              required
            />
          </div>

          <div className="input mb-6 w-full relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primarylight"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primarydark transition duration-150"
          >
            Submit
          </button>

          <Link
            to="/login"
            className="flex items-center mt-4 text-primary hover:text-primarydark transition duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}
