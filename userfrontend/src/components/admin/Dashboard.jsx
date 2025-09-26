import React from 'react'
import AppointmentsServices from '../../services/AppointmentServices.js'
import DoctorServices from '../../services/DoctorServices.js'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [pendingAppointments, setPendingAppointments] = useState([])
  const [cancelledAppointments, setCancelledAppointments] = useState([])
  const [completedAppointments, setCompletedAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAppointments = async () => {
    try {
      const response = await AppointmentsServices.getAppointment()
      setAppointments(response)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await DoctorServices.getDoctors()
      setDoctors(response)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  const fetchPendingAppointments = async () => {
    try {
      const response = await AppointmentsServices.getAppointmentByStatus('pending')
      setPendingAppointments(response)
    } catch (error) {
      console.error('Error fetching pending appointments:', error)
    }
  }

  const fetchCancelledAppointments = async () => {
    try {
      const response = await AppointmentsServices.getAppointmentByStatus('cancelled')
      setCancelledAppointments(response)
    } catch (error) {
      console.error('Error fetching cancelled appointments:', error)
    }
  }

  const fetchCompletedAppointments = async () => {
    try {
      const response = await AppointmentsServices.getAppointmentByStatus('completed')
      setCompletedAppointments(response)
    } catch (error) {
      console.error('Error fetching completed appointments:', error)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true)
      await Promise.all([
        fetchAppointments(),
        fetchDoctors(),
        fetchPendingAppointments(),
        fetchCancelledAppointments(),
        fetchCompletedAppointments()
      ])
      setLoading(false)
    }
    fetchAllData()
  }, [])

  // Stats cards data
  const statsData = [
    {
      title: 'Completed Appointments',
      value: completedAppointments.length,
      icon: '✓',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Pending Appointments',
      value: pendingAppointments.length,
      icon: '⏰',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconBg: 'bg-yellow-100'
    },
    {
      title: 'Cancelled Appointments',
      value: cancelledAppointments.length,
      icon: '✕',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsData.map((stat, index) => (
                <div 
                  key={index}
                  className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
                      <div className={`text-4xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                    </div>
                    <div className={`${stat.iconBg} p-3 rounded-full`}>
                      <span className={`text-2xl ${stat.color}`}>
                        {stat.icon}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Doctors Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-lg">👨‍⚕️</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Doctors</h2>
                </div>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : doctors.length > 0 ? (
                  <div className="space-y-4">
                    {doctors.map((doctor, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-semibold">
                            {(doctor.name || doctor.doctorName || 'D').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {doctor.name || doctor.doctorName || 'Unknown Doctor'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {doctor.specialization || 'General Medicine'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doctor.email || 'No email provided'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">👨‍⚕️</div>
                    <p className="text-gray-500">No doctors found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pending Appointments Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-yellow-600 text-lg">📅</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Pending Appointments</h2>
                </div>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  </div>
                ) : pendingAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Pet Name</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Owner</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingAppointments.map((appointment, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                            <td className="py-3 px-2">
                              <span className="font-medium text-gray-900">
                                {appointment.pet || 'N/A'}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-blue-600 font-medium">
                                {appointment.owner || 'N/A'}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-gray-600">
                                {appointment.appointmentDate || appointment.date ? 
                                  new Date(appointment.appointmentDate || appointment.date).toLocaleDateString() : 
                                  'N/A'
                                }
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {appointment.status || 'pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-gray-500">No pending appointments</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  Add Doctor
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  Schedule Appointment
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  View Reports
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
