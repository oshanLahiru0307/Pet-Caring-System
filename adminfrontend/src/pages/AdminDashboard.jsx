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
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          fontSize:'18px',
          fontWeight:'bold',
          margin:'20px 5px 20px 5px'
        }}>PAW CARE</h1>

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
            onClick={() => (state.adminActiveIndex = 1)}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<CalendarOutlined />}
            onClick={() => (state.adminActiveIndex = 2)}
          >
            Appointments
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<TeamOutlined />}
            onClick={() => (state.adminActiveIndex = 3)}
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
          {snap.adminActiveIndex === 1 && <Dashboard />}
          {snap.adminActiveIndex === 2 && <Appointments />}
          {snap.adminActiveIndex === 3 && <Doctors />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
