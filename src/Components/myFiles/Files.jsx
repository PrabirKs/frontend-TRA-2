import React, { useEffect, useState } from "react";
import Applayout from "../../Applayout";
import { Table, Button, Space, Modal, Menu } from "antd";
import { DeleteOutlined, FilterTwoTone } from "@ant-design/icons";
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
      title: "FILE NAME",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "JOB NAME",
      dataIndex: "jobname",
      key: "jobname",
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
        title:"SIZE",
        dataIndex: "size",
        key: "size"
    },
    {
      title: "CREATION DATE",
      dataIndex: "creation_date",
      key: "creation_date",
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
            type="danger"
            onClick={() => showDeleteConfirm(record)}
          >
             <DeleteOutlined style={{color:"red", fontSize: "20px" }} className="hover:scale-125 hover:filter: contrast(10)"/>
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this task?",
      content: `File Name: ${record.jobname}`,
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
      <div className="bg-white p-10 h-screen">
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
