import React, { useEffect, useState } from "react";
import Applayout from "../../Applayout";
import { Table, Button, Space, Modal, Menu, Tag } from "antd";
import { DeleteOutlined, FilterTwoTone, StopOutlined } from "@ant-design/icons";
import axios from "axios";
import getStatusColor from "../../utils/getStatusColor";

const Jobs = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const { confirm } = Modal;

  const [dataSource, setDataSource] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "JOB NAME",
      dataIndex: "jobname",
      key: "jobname",
    },
    {
      title: "CREATION DATE",
      dataIndex: "creation_date",
      key: "creation_date",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, {status}) => {
        let color = getStatusColor(status);
        return (
          <>
            <Tag color={color} key={status}>
              {status.toString().toUpperCase()}
            </Tag>
          </>
        );
      },
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Menu
          onClick={({ key }) => {
            setSelectedKeys([key]);
            confirm();
          }}
          selectedKeys={selectedKeys}
        >
          <Menu.Item key="Pending">Pending</Menu.Item>
          <Menu.Item key="Progress">Progress</Menu.Item>
          <Menu.Item key="Completed">Completed</Menu.Item>
        </Menu>
      ),
      onFilter: (value, record) => record.status.includes(value),
      filterIcon: (filtered) => (
        <Button type="link" className="p-0 mt-[-7px]">
          <FilterTwoTone />
        </Button>
      ),
    },
    {
      title: "OUTPUT FORMAT",
      dataIndex: "report_format",
      key: "report_format",
    },
    {
      title: "MODEL",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "ACTION",
      align: "right",
      key: "action",
      render: (text, record) => (
        <Space
          size="large"
          align="end"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            className=""
            type="danger"
            onClick={() => showDeleteConfirm(record)}
          >
            <StopOutlined 
              style={{ color: "red", fontSize: "20px" }}
              className="hover:scale-125"
            />
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to STOP this task?",
      content: `Task Name: ${record.jobname}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // Handle delete action here
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Applayout>
      <div className="bg-white p-10 h-screen" style={{}}>
        <h2 style={{ textAlign: "center", fontSize: 25 }}>Job List</h2>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
        />
      </div>
    </Applayout>
  );
};

export default Jobs;
