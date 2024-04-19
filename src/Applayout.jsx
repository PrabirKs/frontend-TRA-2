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

const Applayout = ({ children }) => {
  const data = useContext(Context);

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

  const renderSidebarOrNavbar = () => {
    if (isMobile) {
      return (
        <Menu mode="horizontal">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
            <Link to="/jobs">Task Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/">My Files</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link to="/">Sign Out</Link>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Sider
          style={""}
          collapsible
          theme="light"
          collapsed={data.isCollapsed}
          onCollapse={() => {
            data.setIsCollapsed(!data.isCollapsed);
          }}
        >
          <div className="logo" />
          <UserInfo userEmail={"demo@gmail.com"} username={"john doe"} />
          <Menu mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DashboardOutlined />}>
              <Link to="/jobs">Task Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
              <Link to="/">My Files</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<LogoutOutlined />}>
              <Link to="/">Sign Out</Link>
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
