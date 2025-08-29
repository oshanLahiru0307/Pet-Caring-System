import React, {useState, useEffect} from 'react';
import {Modal, Button, DatePicker, Input, Select, Form} from 'antd';
import appointmentServices from '../services/AppointmentServices';
import doctorServices from '../services/DoctorServices';

const {Option} = Select;

const schedule = [
  { day: 'Mon', hours: '09:00 - 17:00' },
  { day: 'Tue', hours: '09:00 - 17:00' },
  { day: 'Wed', hours: '09:00 - 17:00' },
  { day: 'Thu', hours: '10:00 - 18:00' },
  { day: 'Fri', hours: '09:00 - 17:00' },
  { day: 'Sat', hours: '10:00 - 14:00' },
  { day: 'Sun', hours: 'Closed' },
];

const Availability = () => {

  const {form} = Form.useForm()
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const fetchDoctors = async ()=> {
    try{
      const response = await doctorServices.getDoctors();
      console.log(response);
      setDoctors(response);
    }catch(error){
      console.error('failed get doctors details', error);
    }
  }

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
    <section id="availability" className="py-16 sm:py-20 bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-teal-800">Available Time</h2>
          <p className="mt-3 text-teal-700">Our doctors are here for you and your pets.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {schedule.map((d) => (
            <div key={d.day} className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-teal-100">
              <div className="text-sm font-semibold text-teal-600">{d.day}</div>
              <div className="mt-1 text-teal-800">{d.hours}</div>
            </div>
          ))}
        </div>

        <div id="book" className="mt-10 flex justify-center">
        <Button color="cyan" variant="solid" size="large" onClick={showModal}>
              Appointment
            </Button>
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

    </section>
  );
}

export default Availability;


