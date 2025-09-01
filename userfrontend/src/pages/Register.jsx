import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import UserServices from '../services/UserServices';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/artistic-blurry-colorful-wallpaper-background.jpg'
import { useSnapshot } from 'valtio';
import state from '../store/state';

const Register = () => {
    const navigate = useNavigate();
    const snap = useSnapshot(state);

    const onFinish = async (values) => {
        console.log(values)
        try {
            const response = await UserServices.registerUser(values);
            console.log("Registration response:", response);
            message.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            message.error('Registration failed: ' + (error.response?.data?.message || 'Please check your information.'));
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Failed to submit form:', errorInfo);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: `url(${image1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                padding: '20px',
            }}
        >
            <Form
                layout='vertical'
                name="register_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{
                    width: '400px',
                    padding: 40,
                    borderRadius: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Register</h2>

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' }
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Owner Contact"
                    rules={[
                        { required: true, message: "Please enter owner's contact" },
                        { pattern: /^\d{10}$/, message: "Contact number must be 10 digits" },
                    ]}
                >
                    <Input placeholder="Enter owner's contact" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0 }}>
                    <Checkbox>I agree to the terms and conditions</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Register
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    Already have an account? <p onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: '#1890ff' }}>Sign in Now!</p>
                </div>
            </Form>
        </div>
    );
}

export default Register;