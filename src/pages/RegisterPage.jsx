/* eslint-disable no-empty */
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Notification from "../pages/Notification";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  async function registerUser(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      await axios.post("/register", {
        name,
        email,
        password,
        role: "user", // Default role
      });
      setNotification({ message: "Registration Successful!", type: "success" });
      setRedirect(true);
    } catch (e) {
      if (e.response && e.response.data.error === "Duplicate entry") {
        setNotification({
          message: "This email is already registered. Please log in instead.",
          type: "error",
        });
      } else {
        setNotification({
          message: "Registration failed. Please try again later.",
          type: "error",
        });
      }      
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-gradient-to-br from-purple-500 via-pink-500 to-white">
      <Notification message={notification.message} type={notification.type} />
      <div className="bg-white w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-10 rounded-xl shadow-lg">
        <form className="flex flex-col w-auto items-center" onSubmit={registerUser}>
          <h1 className="px-3 font-extrabold mb-6 text-primarydark text-3xl text-center">Sign Up</h1>
          <div className="input mb-4 w-full">
            <input
              type="text"
              placeholder="Name"
              className="input-et w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primarydark"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="input mb-4 w-full">
            <input
              type="email"
              placeholder="Email"
              className="input-et w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primarydark"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="input mb-4 w-full">
            <input
              type="password"
              placeholder="Password"
              className="input-et w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primarydark"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="input mb-6 w-full">
            <input
              type="password"
              placeholder="Confirm password"
              className="input-et w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primarydark"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>
          <div className="w-full mb-4">
            <button type="submit" className="primary w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-md shadow-md hover:opacity-90 transition-opacity">
              Create Account
            </button>
          </div>
          <div className="flex justify-between w-full mb-4">
            <Link to={"/login"} className="w-full mr-2">
              <button className="text-black w-full py-2 bg-gray-200 rounded-md font-bold hover:bg-gray-300">
                Sign In
              </button>
            </Link>
            <Link to={"/register"} className="w-full ml-2">
              <button className="text-white w-full py-2 bg-primary rounded-md font-bold hover:bg-primarydark">
                Sign Up
              </button>
            </Link>
          </div>
          <Link to={"/"}>
            <button className="secondary py-2 px-4 text-primarydark font-bold hover:underline">
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
