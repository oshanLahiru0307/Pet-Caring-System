import React, { useEffect, useState } from "react";
import doctorServies from "../services/DoctorServices";
import appointmentServices from "../services/AppointmentServices";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

const Navbar = () => {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const fetchDoctors = async () => {
    try {
      const response = await doctorServies.getDoctors();
      setDoctors(response);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSubmitForm = async (appointmentData) => {
    try {
      const response = await appointmentServices.createAppointment(appointmentData);
      console.log("Appointment created:", response);
      form.resetFields()
      handleCancel()

    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  }


  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-teal-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M5 8.5C5 7.12 6.12 6 7.5 6S10 7.12 10 8.5 8.88 11 7.5 11 5 9.88 5 8.5zm4.5 5C9.5 12.12 10.62 11 12 11s2.5 1.12 2.5 2.5S13.38 16 12 16 9.5 14.88 9.5 13.5zM14 8.5C14 7.12 15.12 6 16.5 6S19 7.12 19 8.5 17.88 11 16.5 11 14 9.88 14 8.5z" />
                <path d="M16.75 13.75a.75.75 0 0 1 1.5 0 3.25 3.25 0 0 1-3.25 3.25H14a3.75 3.75 0 0 1-3.75-3.75V9.5a.75.75 0 0 1 1.5 0v3.75A2.25 2.25 0 0 0 14 15.5h1c.689 0 1.25-.561 1.25-1.25z" />
              </svg>
            </span>
            <span className="text-lg font-semibold tracking-tight text-teal-800">
              PawCare
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-teal-800">
            <a href="#home" className="hover:text-teal-600">Home</a>
            <a href="#about" className="hover:text-teal-600">About Us</a>
            <a href="#services" className="hover:text-teal-600">Services</a>
            <a href="#contact" className="hover:text-teal-600">Contact</a>
            <a href="#faq" className="hover:text-teal-600">FAQ</a>
          </nav>

          {/* Appointment Button */}
          <div className="hidden md:block">
            <Button color="cyan" variant="solid" size="large" onClick={showModal}>
              Appointment
            </Button>
          </div>
        </div>
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

          {/* Appointment type */}
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
                <Option key={doc._id} value={doc._id}>
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
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Hidden status */}
          <Form.Item name="status" initialValue="pending" hidden>
            <Input />
          </Form.Item>

          {/* Custom Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Book Appointment
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </header>
  );
};

export default Navbar;
