import React, { useEffect, useState } from "react";
import Applayout from "../../Applayout";
import { Table, Button, Space, Modal, Menu } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import axios from "axios";

const Files = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });
  const [dataSource, setDataSource] = useState([]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const { confirm } = Modal;

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setDataSource(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "File Name",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "TaskName",
      dataIndex: "taskname",
      key: "taskname",
      //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      //     <Menu
      //       onClick={({ key }) => {
      //         setSelectedKeys([key]);
      //         confirm();
      //       }}
      //       selectedKeys={selectedKeys}
      //     >
      //       <Menu.Item key="Pending">Pending</Menu.Item>
      //       <Menu.Item key="InProgress">In Progress</Menu.Item>
      //       <Menu.Item key="Completed">Completed</Menu.Item>
      //     </Menu>
      //   ),
      //   onFilter: (value, record) => record.status.includes(value),
      //   filterIcon: (filtered) => (
      //     <Button type="link" style={{ padding: 0 }}>
      //       <FilterTwoTone/>
      //     </Button>
      //   ),
    },
    {
        title:"Size",
        dataIndex: "size",
        key: "size"
    },
    {
      title: "Creation Date",
      dataIndex: "creation_date",
      key: "creation_date",
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
            className="bg-red-500 text-white"
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
        <h2 style={{ textAlign: "center", fontSize: 20 }}>File List</h2>
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

export default Files;
