import React, {useState} from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import UserServices from '../services/UserServices';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/artistic-blurry-colorful-wallpaper-background.jpg'
import { useSnapshot } from 'valtio';
import state from '../store/state';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const snap = useSnapshot(state)

    const onFinish = async (values) => {
        try {
            const response = await UserServices.loginUser(values);
            console.log("response",response);
            setUser(response.name)
            message.success('Login successful!');
            localStorage.setItem("userId", response._id )
            localStorage.setItem("userName", response.name)
            state.currentUser = response._id 
            state.currentUserName = response.name
            navigate('/');
            console.log(response._id);
        } catch (error) {
            console.error('Login error:', error);
            message.error('Login failed: ' + (error.response?.data?.message || 'Please check your credentials.'));
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
                name="login_form"
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
                <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Login</h2>
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
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Log in
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    Don't have an account? <p onClick={() => navigate('/register')} style={{ cursor:'pointer',color: '#1890ff' }}>Register now!</p>
                </div>
            </Form>
        </div>
    );
}

export default Login;