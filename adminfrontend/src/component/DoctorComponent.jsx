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
            let doctorData = { ...values };
            if (typeof doctorData.availabilityHours === 'string') {
                doctorData.availabilityHours = doctorData.availabilityHours.split(',').map(s => s.trim());
            }

            if (!selectedDoctor) {
                // Generate a new sequential ID
                const sortedDoctors = [...doctors].sort((a, b) => {
                    const idA = parseInt(a.doctorId?.substring(1) || '0', 10);
                    const idB = parseInt(b.doctorId?.substring(1) || '0', 10);
                    return idA - idB;
                });

                const lastDoctor = sortedDoctors[sortedDoctors.length - 1];
                let nextIdNumber = 1;
                if (lastDoctor && lastDoctor.doctorId) {
                    const lastNumber = parseInt(lastDoctor.doctorId.substring(1), 10);
                    nextIdNumber = lastNumber + 1;
                }

                const newDoctorId = `D${String(nextIdNumber).padStart(3, '0')}`;
                doctorData = { ...doctorData, doctorId: newDoctorId };

                await DoctorServices.createDoctor(doctorData);
                message.success(`Doctor added successfully with ID: ${newDoctorId}`);
            } else {
                await DoctorServices.updateDoctor(selectedDoctor._id, doctorData);
                message.success('Doctor updated successfully');
            }

            fetchDoctors();
            setModalVisible(false);
            form.resetFields();
            setSelectedDoctor(null);
        } catch (error) {
            console.error('Error saving doctor:', error);
            message.error('Failed to save doctor');
        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table changed:', pagination, filters, sorter)
    }

    const filteredDoctors = doctors.filter(doctor => {
        const lowerCaseSearch = searchText.toLowerCase();
        return (
            (doctor.doctorId && doctor.doctorId.toLowerCase().includes(lowerCaseSearch)) ||
            (doctor.name && doctor.name.toLowerCase().includes(lowerCaseSearch)) ||
            (doctor.specialty && doctor.specialty.toLowerCase().includes(lowerCaseSearch)) ||
            (doctor.contact && doctor.contact.toLowerCase().includes(lowerCaseSearch)) ||
            (doctor.email && doctor.email.toLowerCase().includes(lowerCaseSearch))
        );
    });

    const generatePDF = () => {
        const doc = new jsPDF();
        const reportTitle = "Doctors Report";
        const printedDate = moment().format("YYYY-MM-DD HH:mm:ss");

        doc.setFontSize(22);
        doc.text(reportTitle, 14, 20);
        doc.setFontSize(10);
        doc.text(`Printed Date: ${printedDate}`, 200, 20, null, null, 'right');

        const columns = [
            "ID",
            "Name",
            "Specialty",
            "Contact",
            "Email",
            "Available Days",
            "Available Hours",
        ];

        const rows = filteredDoctors.map(doctor => [
            doctor.doctorId || 'N/A',
            doctor.name,
            doctor.specialty,
            doctor.contact,
            doctor.email,
            doctor.availabilityDays.join(', '),
            Array.isArray(doctor.availabilityHours) ? doctor.availabilityHours.join(', ') : '',
        ]);

        autotable(doc, {
            startY: 30,
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

        doc.save("doctors_report.pdf");
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "doctorId",
            key: "doctorId",
            sorter: (a, b) => {
                const idA = parseInt(a.doctorId?.substring(1) || '0', 10);
                const idB = parseInt(b.doctorId?.substring(1) || '0', 10);
                return idA - idB;
            },
        },
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
                <Button type="primary" onClick={() => {
                    setSelectedDoctor(null);
                    form.resetFields();
                    setModalVisible(true);
                }}>Add Doctor</Button>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <Input.Search 
                        placeholder="Search by ID or Name" 
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
                    setModalVisible(false);
                    form.resetFields();
                    setSelectedDoctor(null);
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
                    <Form.Item name="doctorId" hidden>
                        <Input />
                    </Form.Item>
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
                        rules={[
                            { required: true, message: "Please enter owner's contact" },
                            { pattern: /^\d{10}$/, message: "Contact number must be 10 digits" },
                          ]}
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

export default DoctorComponent;