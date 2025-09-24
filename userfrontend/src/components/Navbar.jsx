import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { Button, Modal, Form, Input, DatePicker, Select, Dropdown, message } from "antd";
import dayjs from "dayjs";
import state from "../store/state";
import doctorServies from "../services/DoctorServices";
import appointmentServices from "../services/AppointmentServices";
import AppointmentServices from "../services/AppointmentServices";

const { Option } = Select;

const Navbar = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(state);
  const [appointment, setAppointments] = useState([])
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('roll');
    state.currentUser = null;
    state.currentUserName = null;
    state.currentUserRoll = null;
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: `Welcome, ${snap.currentUserName}`,
      disabled: true,
    },
    {
      key: 'myappointments',
      label: 'My Appointments',
      onClick: () => navigate('/myappointment'),
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const doctorMenuItems = [
    {
      key: 'profile',
      label: `Welcome, ${snap.currentUserName}`,
      disabled: true,
    },
    {
      key: 'posts',
      label: 'My Posts',
      onClick: () => navigate('/doctorposts'),
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,
    }
  ];

  const fetchDoctors = async () => {
    try {
      const response = await doctorServies.getDoctors();
      setDoctors(response);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      message.error("Failed to load doctor details.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await AppointmentServices.getAppointment();
      setAppointments(response);
    } catch (error) {
      console.error("failed to load appointments", error);
    }
  };

  const getNextAppointmentId = () => {
    if (appointment.length === 0) {
      return 'A001';
    }

    // Sort appointments by ID to find the last one
    const sortedAppointments = [...appointment].sort((a, b) => {
      const idA = parseInt(a.appointmentId.substring(1));
      const idB = parseInt(b.appointmentId.substring(1));
      return idA - idB;
    });

    const lastAppointment = sortedAppointments[sortedAppointments.length - 1];
    const lastIdNumber = parseInt(lastAppointment.appointmentId.substring(1));
    const nextIdNumber = lastIdNumber + 1;

    // Pad the number with leading zeros
    const paddedId = String(nextIdNumber).padStart(3, '0');
    return `A${paddedId}`;
  };

  const handleSubmitForm = async (values) => {
    try {
      const newAppointmentId = getNextAppointmentId();
      const appointmentData = {
        ...values,
        appointmentId: newAppointmentId,
        appointmentDate: dayjs(values.appointmentDate).toISOString(),
      };

      const response = await appointmentServices.createAppointment(appointmentData);
      console.log("Appointment created:", response);
      message.success("Appointment booked successfully!");
      handleCancel();

    } catch (error) {
      console.error("Error creating appointment:", error);
      message.error("Failed to book appointment. Please try again.");
    }
  };

  const disabledPastDates = (current) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    console.log(snap.currentUserName, snap.currentUserRoll)
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderBottom: '1px solid #FFD58E' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl shadow-sm" style={{ backgroundColor: '#FFD58E', color: '#54413C' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M5 8.5C5 7.12 6.12 6 7.5 6S10 7.12 10 8.5 8.88 11 7.5 11 5 9.88 5 8.5zm4.5 5C9.5 12.12 10.62 11 12 11s2.5 1.12 2.5 2.5S13.38 16 12 16 9.5 14.88 9.5 13.5zM14 8.5C14 7.12 15.12 6 16.5 6S19 7.12 19 8.5 17.88 11 16.5 11 14 9.88 14 8.5z" />
                <path d="M16.75 13.75a.75.75 0 0 1 1.5 0 3.25 3.25 0 0 1-3.25 3.25H14a3.75 3.75 0 0 1-3.75-3.75V9.5a.75.75 0 0 1 1.5 0v3.75A2.25 2.25 0 0 0 14 15.5h1c.689 0 1.25-.561 1.25-1.25z" />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight" style={{ color: '#54413C' }}>
              PawCare
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" style={{ color: '#54413C' }}>
            <Link to="/" className="hover:text-amber-700">Home</Link>
            <a href="#about" className="hover:text-amber-700">About Us</a>
            <a href="#services" className="hover:text-amber-700">Services</a>
            <a href="#contact" className="hover:text-amber-700">Contact</a>
            <a href="#faq" className="hover:text-amber-700">FAQ</a>
            <Link to="/userposts" className="hover:text-amber-700">Posts</Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Appointment Button - Only show when logged in */}
            {snap.currentUser && snap.currentUserRoll === 'user' && (
              <Button style={{ backgroundColor: '#54413C', color: 'white' }} onClick={showModal}>
                Appointment
              </Button>
            )}

            {/* Login/Register buttons - Only show when not logged in */}
            {!snap.currentUser && (
              <>
                <Button style={{ color: '#54413C', borderColor: '#54413C' }} onClick={() => navigate('/login')}>
                  Login
                </Button>
              </>
            )}

            {/* User dropdown - Only show when logged in */}
            {snap.currentUser && (
              <Dropdown
                menu={snap.currentUserRoll === 'user' ? { items: userMenuItems } : { items: doctorMenuItems }}
                placement="bottomRight"
                arrow
              >
                <Button type="text" className="flex items-center gap-2" style={{ color: '#54413C' }}>
                  <span>{snap.currentUserName}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#54413C' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </Dropdown>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              type="text"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#54413C' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden" style={{ borderTop: '1px solid #FFD58E', backgroundColor: 'white' }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2" style={{ color: '#54413C' }}>HOME</a>
              <a href="#about" className="block px-3 py-2" style={{ color: '#54413C' }}>ABOUT US</a>
              <a href="#services" className="block px-3 py-2" style={{ color: '#54413C' }}>SERVICES</a>
              <a href="#contact" className="block px-3 py-2" style={{ color: '#54413C' }}>CONTACT</a>
              <a href="#faq" className="block px-3 py-2" style={{ color: '#54413C' }}>FAQ</a>

              {/* Mobile authentication buttons */}
              {!snap.currentUser ? (
                <div className="pt-4 space-y-2">
                  <Button type="text" block onClick={() => navigate('/login')} style={{ color: '#54413C' }}>
                    Login
                  </Button>
                  <Button type="primary" block onClick={() => navigate('/register')} style={{ backgroundColor: '#54413C', borderColor: '#54413C' }}>
                    Register
                  </Button>
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <div className="px-3 py-2 text-sm" style={{ color: '#333333' }}>
                    Welcome, {snap.currentUserName}
                  </div>
                  <Button style={{ backgroundColor: '#54413C', color: 'white' }} block onClick={showModal}>
                    Appointment
                  </Button>
                  <Button type="text" block onClick={() => navigate('/myappointment')} style={{ color: '#54413C' }}>
                    My Appointments
                  </Button>
                  <Button type="text" block onClick={handleLogout} style={{ color: '#54413C' }}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      <Modal
        title="Book Appointment"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitForm}
        >
          {/* Pet name */}
          <Form.Item
            name="pet"
            label="Pet Name"
            rules={[{ required: true, message: "Please enter your pet's name" }]}
          >
            <Input placeholder="Enter pet name" />
          </Form.Item>

          {/* Owner name */}
          <Form.Item
            name="owner"
            label="Owner Name"
            rules={[{ required: true, message: "Please enter owner's name" }]}
          >
            <Input placeholder="Enter owner's name" />
          </Form.Item>

          {/* Owner contact */}
          <Form.Item
            name="contact"
            label="Owner Contact"
            rules={[
              { required: true, message: "Please enter owner's contact" },
              { pattern: /^\d{10}$/, message: "Contact number must be 10 digits" },
            ]}
          >
            <Input placeholder="Enter owner's contact" />
          </Form.Item>

          {/* Pet type */}
          <Form.Item
            name="type"
            label="Pet Type"
            rules={[{ required: true, message: "Please select pet type" }]}
          >
            <Input placeholder="Enter pet's type" />
          </Form.Item>

          {/* Doctor selection */}
          <Form.Item
            name="doctor"
            label="Select Doctor"
            rules={[{ required: true, message: "Please select a doctor" }]}
          >
            <Select placeholder="Choose a doctor">
              {doctors.map((doc) => (
                <Option key={doc._id} value={doc.name}>
                  {doc.name} — {doc.specialty}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Appointment date */}
          <Form.Item
            name="appointmentDate"
            label="Appointment Date"
            rules={[{ required: true, message: "Please pick a date" }]}
          >
            <DatePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              disabledDate={disabledPastDates}
            />
          </Form.Item>

          {/* Hidden status */}
          <Form.Item name="status" initialValue="pending" hidden>
            <Input />
          </Form.Item>

          {/* Custom Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ backgroundColor: '#54413C', borderColor: '#54413C' }}>
              Book Appointment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </header>
  );
};

export default Navbar;