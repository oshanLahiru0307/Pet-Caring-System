import React from 'react'
import Navbar from '../components/Navbar'

const UserHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Welcome to Pet Care System
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  📅 Book Appointment
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  📋 View Appointments
                </button>
                <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  📝 Create Post
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Last Appointment</div>
                  <div>Dr. Smith - Dec 15, 2024</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Last Post</div>
                  <div>Pet Health Tips - Dec 10, 2024</div>
                </div>
              </div>
            </div>

            {/* Chat Support */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                Chat with our veterinary team for immediate assistance with your pet's health concerns.
              </p>
              <div className="text-sm text-green-600 font-medium">
                💬 Chat support available 24/7
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserHomePage
