import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message, DatePicker, Select } from "antd";
import AppointmentServices from "../../services/AppointmentServices";
import DoctorServices from "../../services/DoctorServices";
import moment from "moment";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";

const { Option } = Select;

const AppointmentComponents = () => {
    const [appointments, setAppointments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    const fetchAppointments = async () => {
        try {
            const data = await AppointmentServices.getAppointment();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await DoctorServices.getDoctors();
            setDoctors(response);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
    }, []);

    const handleAddAppointment = async (values) => {
        try {
            let appointmentData = {
                ...values,
                appointmentDate: dayjs(values.appointmentDate).toISOString(),
            };

            if (!selectedAppointment) {
                const sortedAppointments = [...appointments].sort((a, b) => {
                    const idA = parseInt(a.appointmentId?.substring(1) || '0', 10);
                    const idB = parseInt(b.appointmentId?.substring(1) || '0', 10);
                    return idA - idB;
                });

                const lastAppointment = sortedAppointments[sortedAppointments.length - 1];
                let nextIdNumber = 1;
                if (lastAppointment && lastAppointment.appointmentId) {
                    const lastNumber = parseInt(lastAppointment.appointmentId.substring(1), 10);
                    nextIdNumber = lastNumber + 1;
                }

                const newAppointmentId = `A${String(nextIdNumber).padStart(3, '0')}`;
                appointmentData = { ...appointmentData, appointmentId: newAppointmentId };

                await AppointmentServices.createAppointment(appointmentData);
                message.success(`Appointment added successfully with ID: ${newAppointmentId}`);
            } else {
                await AppointmentServices.updateAppointment(selectedAppointment._id, appointmentData);
                message.success("Appointment updated successfully");
            }

            setModalVisible(false);
            form.resetFields();
            setSelectedAppointment(null);
            fetchAppointments();
        } catch (error) {
            console.error("Error saving appointment:", error);
            message.error("Failed to save appointment");
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            await AppointmentServices.deleteAppointment(appointmentId);
            fetchAppointments();
            message.success("Appointment deleted successfully");
        } catch (error) {
            console.error("Error deleting appointment:", error);
            message.error("Failed to delete appointment");
        }
    };

    const disabledPastDates = (current) => {
        // Can not select days before today
        return current && current < dayjs().startOf('day');
      };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log("Table changed:", pagination, filters, sorter);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const companyName = "Pet Care Center";
        const reportTitle = "Appointments Report";
        const printedDate = moment().format("YYYY-MM-DD HH:mm:ss");

        doc.setFontSize(18);
        doc.text(companyName, 14, 20);
        doc.setFontSize(10);
        doc.text(`Printed Date: ${printedDate}`, 180, 20, null, null, 'right');

        doc.setFontSize(22);
        doc.text(reportTitle, 105, 40, null, null, 'center');

        const columns = [
            "ID",
            "Pet Name",
            "Pet Type",
            "Owner",
            "Doctor",
            "Appointment Date",
            "Status",
        ];

        const rows = appointments.map(appt => [
            appt.appointmentId || 'N/A',
            appt.pet,
            appt.type,
            appt.owner,
            appt.doctor,
            moment(appt.appointmentDate).format("YYYY-MM-DD HH:mm:ss"),
            appt.status
        ]);

        autotable(doc, {
            startY: 50,
            head: [columns],
            body: rows,
            theme: 'striped',
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontSize: 12,
            },
            bodyStyles: {
                fontSize: 10,
            },
        });

        doc.save("appointments_report.pdf");
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "appointmentId",
            key: "appointmentId",
            sorter: (a, b) => {
                const idA = parseInt(a.appointmentId?.substring(1) || '0', 10);
                const idB = parseInt(b.appointmentId?.substring(1) || '0', 10);
                return idA - idB;
            },
        },
        {
            title: "Pet Name",
            dataIndex: "pet",
            key: "pet",
            sorter: (a, b) => a.pet.localeCompare(b.pet),
        },
        {
            title: "Pet Type",
            dataIndex: "type",
            key: "type",
            sorter: (a, b) => a.type.localeCompare(b.type),
        },
        {
            title: "Owner",
            dataIndex: "owner",
            key: "owner",
            sorter: (a, b) => a.owner.localeCompare(b.owner),
        },
        {
            title: "Contact",
            dataIndex: "contact",
            key: "contact",
            sorter: (a, b) => a.contact.localeCompare(b.contact),
        },
        {
            title: "Doctor",
            dataIndex: "doctor",
            key: "doctor",
            sorter: (a, b) => a.doctor.localeCompare(b.doctor),
        },
        {
            title: "Date",
            dataIndex: "appointmentDate",
            key: "appointmentDate",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
            sorter: (a, b) => moment(a.appointmentDate).unix() - moment(b.appointmentDate).unix(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <span>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this appointment?"
                        onConfirm={() => handleDeleteAppointment(record._id)}
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

    const handleEdit = (record) => {
        setSelectedAppointment(record);
        form.setFieldsValue({
            ...record,
            appointmentDate: record.appointmentDate ? dayjs(record.appointmentDate) : null,
        });
        setModalVisible(true);
    };

    const filteredAppointments = appointments.filter(appointment => {
        const lowerCaseSearch = searchText.toLowerCase();
        return (
            (appointment.appointmentId && appointment.appointmentId.toLowerCase().includes(lowerCaseSearch)) ||
            (appointment.pet && appointment.pet.toLowerCase().includes(lowerCaseSearch)) ||
            (appointment.owner && appointment.owner.toLowerCase().includes(lowerCaseSearch)) ||
            (appointment.contact && appointment.contact.includes(lowerCaseSearch))
        );
    });

    return (
        <div>
            <div>
                <h1 style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                }}>Appointments</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedAppointment(null);
                        form.resetFields();
                        setModalVisible(true);
                    }}
                >
                    Add Appointment
                </Button>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                    <Input.Search
                        placeholder="Search by ID, Pet, Owner, or Contact"
                        allowClear
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                    <Button
                        type="primary"
                        onClick={generatePDF}
                        style={{ marginLeft: 8 }}
                    >
                        Generate Report
                    </Button>
                </div>
            </div>
            <Table
                dataSource={filteredAppointments}
                columns={columns}
                rowKey="_id"
                onChange={handleTableChange}
            />

            <Modal
                title={selectedAppointment ? "Edit Appointment" : "Add Appointment"}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    form.resetFields();
                    setSelectedAppointment(null);
                }}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            handleAddAppointment(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="appointmentId" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="pet"
                        label="Pet Name"
                        rules={[{ required: true, message: "Please enter your pet's name" }]}
                    >
                        <Input placeholder="Enter pet name" />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Pet Type"
                        rules={[{ required: true, message: "Please select pet type" }]}
                    >
                        <Select placeholder="type">
                            <Option value="pending">Dog</Option>
                            <Option value="completed">Cat</Option>
                            <Option value="cancelled">Other...</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="owner"
                        label="Owner Name"
                        rules={[{ required: true, message: "Please enter owner's name" }]}
                    >
                        <Input placeholder="Enter owner's name" />
                    </Form.Item>

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

                    <Form.Item
                        name="appointmentDate"
                        label="Appointment Date"
                        rules={[{ required: true, message: "Please pick a date" }]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%" }}
                            disabledDate={disabledPastDates}
                        />
                    </Form.Item>

                    <Form.Item name="status" initialValue="pending">
                        <Select placeholder="status">
                            <Option value="pending">Pending</Option>
                            <Option value="completed">Completed</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AppointmentComponents;