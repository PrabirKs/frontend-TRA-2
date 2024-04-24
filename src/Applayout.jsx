import React, { useEffect, useState, useContext, Suspense } from "react";
import { ConfigProvider, Layout, Menu, Modal, theme } from "antd";
import {
  ContactsOutlined,
  DashboardOutlined,
  FileOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";
import UserInfo from "./Components/ui/UserInfoCard";
import { Context } from "./Context/AppProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Applayout = ({ children }) => {
  const data = useContext(Context);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const logout = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("http://localhost:8070/logout", null, config);
      // Clear access token from local storage or cookies
      localStorage.removeItem("access_token");
      navigate("/")
      // Redirect the user to the login page or any other page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const renderSidebarOrNavbar = () => {
    if (isMobile) {
      return (
        <Menu
          mode="horizontal"
          style={{ backgroundColor: "#1677ff", color: "white" }}
        >
          <Menu.Item style={{ color: "white" }} key="1" icon={<HomeOutlined />}>
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item
            style={{ color: "white" }}
            key="2"
            icon={<DashboardOutlined />}
          >
            <Link to="/jobs">Job Dashboard</Link>
          </Menu.Item>
          <Menu.Item style={{ color: "white" }} key="3" icon={<FileOutlined />}>
            <Link to="/files">My Files</Link>
          </Menu.Item>

          <Menu.Item
            style={{ color: "white" }}
            key="4"
            icon={<LogoutOutlined />}
            onClick={() => logout()}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Sider
          style={{ backgroundColor: "#1677ff", height: "100vh" }}
          collapsible
          theme="light"
          collapsed={data.isCollapsed}
          onCollapse={() => {
            data.setIsCollapsed(!data.isCollapsed);
          }}
        >
          <div className="logo" />
          <UserInfo userEmail={data.user} />
          <Menu
            mode="inline"
            style={{ backgroundColor: "#1677ff", color: "white" }}
          >
            <Menu.Item
              style={{ color: "white" }}
              key="1"
              icon={<HomeOutlined />}
            >
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item
              style={{ color: "white" }}
              key="2"
              icon={<DashboardOutlined />}
            >
              <Link to="/jobs">Job Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              style={{ color: "white" }}
              key="3"
              icon={<FileOutlined />}
            >
              <Link to="/files">My Files</Link>
            </Menu.Item>

            <Menu.Item
              style={{ color: "white" }}
              key="4"
              icon={<LogoutOutlined />}
              onClick={() => logout()}
            >
              Sign Out
            </Menu.Item>
          </Menu>
        </Sider>
      );
    }
  };

  const { Sider, Content } = Layout;
  const { Item } = Menu;
  return (
    <Layout className="bg-blue-500">
      {renderSidebarOrNavbar()}
      <Layout>
        <Content>
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Applayout;
