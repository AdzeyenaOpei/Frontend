import React from "react";
import { Link } from "react-router-dom";
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-32 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              CampusConnect
            </h1>
            <p className="text-xl">
              The complete solution for event planners, venues, and organizers. 
            </p>
            <div className="flex gap-4">
              <Link to="/events">
                <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100">
                  View Events
                </button>
              </Link>
              <Link to="/createevent">
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 border border-white">
                  Add Event
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="./Api-Images/academic-city-ghana.jpg" 
              alt="Dashboard Preview" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-20 px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Everything You Need to Manage Events Successfully
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <img src="./Api-Images/Smart.jpg" alt="Calendar" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Smart Scheduling</h3>
              <p className="text-gray-600">
                Powerful calendar management with conflict detection and resource allocation
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <img src="./Api-Images/Seamless.png" alt="Booking" className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold">Seamless Bookings</h3>
              <p className="text-gray-600">
                Handle registrations, payments, and confirmations in one place
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <img src="./Api-Images/Detailed.png" alt="Reports" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Detailed Analytics</h3>
              <p className="text-gray-600">
                Generate comprehensive reports and insights for better decision making
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="py-20 px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Features That Drive Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Event Planning",
                description: "Create and manage events with customizable templates and workflows"
              },
              {
                title: "Resource Management",
                description: "Track equipment, venues, and staff availability in real-time"
              },
              {
                title: "Attendee Management",
                description: "Handle registrations, check-ins, and communications efficiently"
              },
              {
                title: "Marketing Tools",
                description: "Promote events and track campaign performance"
              },
              {
                title: "Integration Ready",
                description: "Connect with your favorite tools and platforms seamlessly"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Event Management?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of successful event organizers who trust our platform
          </p>
        </div>
      </div>

      
    </div>
  );
}
