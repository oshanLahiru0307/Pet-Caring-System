import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store/state";
import Doctors from "../component/DoctorComponent";
import Appointments from "../component/AppointmentComponents";
import Dashboard from "../component/Dashboard";

const { Content, Sider } = Layout;

const AdminDashboard = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
      >
        {/* Logo / Header Section */}
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: 8,
          }}
        />

        {/* Sidebar Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 96px)", // subtract logo height + margin
          }}
        >
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => (state.activeIndex = 1)}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<CalendarOutlined />}
            onClick={() => (state.activeIndex = 2)}
          >
            Appointments
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<TeamOutlined />}
            onClick={() => (state.activeIndex = 3)}
          >
            Doctors
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </Menu.Item>

          {/* Collapse Button at Bottom */}
          <Menu.Item
            key="collapse"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginTop: "auto" }}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Content Layout (shifted right to avoid overlap) */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: "0.2s" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
          }}
        >
          {snap.activeIndex === 1 && <Dashboard />}
          {snap.activeIndex === 2 && <Appointments />}
          {snap.activeIndex === 3 && <Doctors />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
