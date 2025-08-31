import React, { useState } from "react";
import { Form, Input, Button, Card, Modal, message } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const PasswordResetSchema = Yup.object().shape({
  newPassword: Yup.string().required("New password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError("");
    try {
      localStorage.setItem("email", values.email);
      if (values.email === "admin@gmail.com") {
        navigate("/adminDashboard");
        message.success("Welcome back");
      } else if (values.email === "reception@gmail.com") {
        navigate("/receptionDashboard");
        message.success("Welcome back");
      }

    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'url("/18129294.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card title="Login" style={{ width: 300, backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onFinish={handleSubmit}>
              <Form.Item
                validateStatus={touched.email && errors.email ? "error" : ""}
                help={touched.email && errors.email ? errors.email : ""}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item
                validateStatus={
                  touched.password && errors.password ? "error" : ""
                }
                help={
                  touched.password && errors.password ? errors.password : ""
                }
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
              <Form.Item>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
