import React, { useEffect, useState } from "react";
import Applayout from "../../Applayout";
import { Table, Button, Space, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const Files = () => {
  const [dataSource, setDataSource] = useState([]);

  const { confirm } = Modal;

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8070/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setDataSource(response.data);
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "JOB NAME",
      dataIndex: "jobname",
      key: "jobname",
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
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
          <Button type="danger" onClick={() => showDeleteConfirm(record)}>
            <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure you want to delete this file?",
      content: `File Name: ${record.name}`,
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
          rowKey="id"
          pagination={{ pageSize: 8 }}
        />
      </div>
    </Applayout>
  );
};

export default Files;
