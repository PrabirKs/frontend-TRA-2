import React, { useEffect, useState, useContext } from "react";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import {
  DashboardOutlined,
  FileOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UserInfo from "./Components/ui/UserInfoCard";
import { Context } from "./Context/AppProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Applayout = ({ children }) => {
  const context = useContext(Context);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const { Sider, Content } = Layout;

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    setUser(loggedUser);

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
      localStorage.removeItem("user");
      navigate("/");
      // Redirect the user to the login page or any other page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const renderSidebarOrNavbar = () => {
    if (isMobile & false) {
      return (
        <div className="sider-h">
          <Menu
            mode="horizontal"
            style={{ backgroundColor: "#1677ff", color: "white" }}
            items={null}
          >
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              style={{ color: "white" }}
            >
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<DashboardOutlined />}
              style={{ color: "white" }}
            >
              <Link to="/jobs">Job Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<FileOutlined />}
              style={{ color: "white" }}
            >
              <Link to="/files">My Files</Link>
            </Menu.Item>
            {user && (
              <Menu.Item
                key="4"
                icon={<LogoutOutlined />}
                onClick={logout}
                style={{ color: "white" }}
              >
                Sign Out
              </Menu.Item>
            )}
          </Menu>
        </div>
      );
    } else {
      return (
        <div className="sider-v ">
          <Sider
            collapsible
            theme="light"
            collapsed={context.isCollapsed}
            onCollapse={() => context.setIsCollapsed(!context.isCollapsed)}
            style={{ backgroundColor: "#1677ff", height: "100vh" }}
          >
            <div className="logo" />
            <UserInfo userEmail={user} />
            <Menu
              mode="inline"
              style={{ backgroundColor: "#1677ff", color: "white" }}
              items={null}
            >
              <Menu.Item
                key="1"
                icon={<HomeOutlined />}
                style={{ color: "white" }}
              >
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<DashboardOutlined />}
                style={{ color: "white" }}
              >
                <Link to="/jobs">Job Dashboard</Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                icon={<FileOutlined />}
                style={{ color: "white" }}
              >
                <Link to="/files">My Files</Link>
              </Menu.Item>
              {user && (
                <Menu.Item
                  key="4"
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  style={{ color: "white" }}
                >
                  Sign Out
                </Menu.Item>
              )}
            </Menu>
          </Sider>
        </div>
      );
    }
  };

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
// PropTypes validation for children
Applayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Applayout;
