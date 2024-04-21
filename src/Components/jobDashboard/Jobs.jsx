import React, { useEffect, useState } from "react";
import Applayout from "../../Applayout";
import { Table, Button, Space, Modal, Menu } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import axios from "axios";

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
      title: "Job Name",
      dataIndex: "jobname",
      key: "jobname",
    },
    {
      title: "Creation Date",
      dataIndex: "creation_date",
      key: "creation_date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Menu
          onClick={({ key }) => {
            setSelectedKeys([key]);
            confirm();
          }}
          selectedKeys={selectedKeys}
        >
          <Menu.Item key="Pending">Pending</Menu.Item>
          <Menu.Item key="InProgress">In Progress</Menu.Item>
          <Menu.Item key="Completed">Completed</Menu.Item>
        </Menu>
      ),
      onFilter: (value, record) => record.status.includes(value),
      filterIcon: (filtered) => (
        <Button type="link" style={{ padding: 0 }}>
          <FilterTwoTone />
        </Button>
      ),
    },
    {
      title: "Output Format",
      dataIndex: "report_format",
      key: "report_format",
    },
    {
      title:'Model',
      dataIndex:"model",
      key:"model"
    },
    {
      title: "Action",
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
            className="bg-red-600 text-white"
            type="danger"
            onClick={() => showDeleteConfirm(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this task?",
      content: `Task ID: ${record.id}, Task Name: ${record.taskname}`,
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
      <div className="bg-white p-10">
        <h2 style={{ textAlign: "center", fontSize: 25 }}>Task List</h2>
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
