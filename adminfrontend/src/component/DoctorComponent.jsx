import React from 'react'
import DoctorServices from '../services/doctorServices'
import { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Popconfirm, message, Select, Checkbox } from 'antd'
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";
import moment from "moment";

const { Option } = Select;

const DoctorComponent = () => {

    const [doctors, setDoctors] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [form] = Form.useForm()

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const fetchDoctors = async () => {
        try {
            const response = await DoctorServices.getAllDoctors()
            setDoctors(response)
        } catch (error) {
            console.error('Error fetching doctors:', error)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    const handleDeleteDoctor = async (doctorId) => {
        try {
            await DoctorServices.deleteDoctor(doctorId)
            fetchDoctors()
            message.success('Doctor deleted successfully')
        } catch (error) {
            console.error('Error deleting doctor:', error)
            message.error('Failed to delete doctor')
        }
    }

    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor)
        form.setFieldsValue(doctor)
        setModalVisible(true)
    }

    const handleAddDoctor = async (values) => {
        try {
            if (!selectedDoctor) {
                await DoctorServices.createDoctor(values)
                fetchDoctors()
                setModalVisible(false)
                message.success('Doctor added successfully')
            } else {
                await DoctorServices.updateDoctor(selectedDoctor._id, values)
                fetchDoctors()
                setModalVisible(false)
                message.success('Doctor updated successfully')
            }
        } catch (error) {
            console.error('Error adding doctor:', error)
            message.error('Failed to add doctor')
        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter)
    }

    const filteredDoctors = doctors.filter(doctor => {
        const lowerCaseSearch = searchText.toLowerCase()
        return (
            doctor.name.toLowerCase().includes(lowerCaseSearch) ||
            doctor.specialty.toLowerCase().includes(lowerCaseSearch) ||
            doctor.contact.toLowerCase().includes(lowerCaseSearch) ||
            doctor.email.toLowerCase().includes(lowerCaseSearch)
        )
    })

    const generatePDF = () => {
        const doc = new jsPDF();
        const reportTitle = "Doctors Report";
        const printedDate = moment().format("YYYY-MM-DD HH:mm:ss");

        // Add Report Title and Date
        doc.setFontSize(22);
        doc.text(reportTitle, 14, 20);
        doc.setFontSize(10);
        doc.text(`Printed Date: ${printedDate}`, 200, 20, null, null, 'right');

        // Define table columns
        const columns = [
            "Name",
            "Specialty",
            "Contact",
            "Email",
            "Available Days",
            "Available Hours",
        ];

        // Map filtered data to rows
        const rows = filteredDoctors.map(doctor => [
            doctor.name,
            doctor.specialty,
            doctor.contact,
            doctor.email,
            doctor.availabilityDays.join(', '),
            doctor.availabilityHours.join(', '),
        ]);

        // Use autoTable to generate the table
        autotable(doc,{
            startY: 30, // Start table below the title
            head: [columns],
            body: rows,
            theme: 'striped',
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontSize: 10,
            },
            bodyStyles: {
                fontSize: 9,
            },
        });

        // Save the PDF
        doc.save("doctors_report.pdf");
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Specialty",
            dataIndex: "specialty",
            key: "specialty",
            sorter: (a, b) => a.specialty.localeCompare(b.specialty),
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
            sorter: (a, b) => a.contact.localeCompare(b.contact),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Available Days",
            dataIndex: "availabilityDays",
            key: "availabilityDays",
            render: (days) => days.join(', '),
            sorter: (a, b) => a.availabilityDays.length - b.availabilityDays.length,
        },
        {
            title: "Available Hours",
            dataIndex: "availabilityHours",
            key: "availabilityHours",
            render: (hours) => hours.join(', '),
            sorter: (a, b) => a.availabilityHours.length - b.availabilityHours.length,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <span>
                    <Button type="primary" onClick={() => handleEditDoctor(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this doctor?"
                        onConfirm={() => handleDeleteDoctor(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger style={{ marginLeft: 8 }}>
                            Delete
                        </Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div>
            <h1 style={{
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: '20px',
            }}>
                Doctors Details
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Button type="primary" onClick={() => setModalVisible(true)}>Add Doctor</Button>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <Input.Search 
                        placeholder="Search by Name" 
                        allowClear 
                        onChange={(e) => setSearchText(e.target.value)} 
                        style={{ width: 300 }} 
                    />
                    <Button type="primary" onClick={generatePDF}>Generate Report</Button>
                </div>
            </div>
            <Table dataSource={filteredDoctors} columns={columns} onChange={handleTableChange} />

            <Modal title={selectedDoctor ? "Edit Doctor" : "Add Doctor"}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false)
                    form.resetFields()
                    setSelectedDoctor(null)
                }}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            handleAddDoctor(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}>
                <Form form={form} layout="vertical">
                    {/* Name */}
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter the doctor\'s name!' }]}
                    >
                        <Input placeholder="Doctor's Name" />
                    </Form.Item>

                    {/* Specialty */}
                    <Form.Item
                        name="specialty"
                        label="Specialty"
                        rules={[{ required: true, message: 'Please enter the doctor\'s specialty!' }]}
                    >
                        <Input placeholder="e.g., Veterinarian, Surgeon" />
                    </Form.Item>

                    {/* Contact */}
                    <Form.Item
                        name="contact"
                        label="Contact Number"
                        rules={[{ required: true, message: 'Please enter the contact number!' }]}
                    >
                        <Input placeholder="e.g., +1234567890" />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter the email!' },
                            { type: 'email', message: 'The input is not a valid E-mail!' },
                        ]}
                    >
                        <Input placeholder="e.g., doctor@example.com" />
                    </Form.Item>

                    {/* Availability Days */}
                    <Form.Item
                        name="availabilityDays"
                        label="Availability Days"
                        rules={[{ required: true, message: 'Please select at least one day!' }]}
                    >
                        <Checkbox.Group options={daysOfWeek} />
                    </Form.Item>

                    {/* Availability Hours */}
                    <Form.Item
                        name="availabilityHours"
                        label="Availability Hours"
                        rules={[{ required: true, message: 'Please enter at least one time slot!' }]}
                        tooltip="You can type and press Enter to add multiple time slots (e.g., 09:00-12:00, 14:00-17:00)"
                    >
                        <Input placeholder="Enter availability hours (e.g., 09:00-12:00, 14:00-17:00)" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default DoctorComponent