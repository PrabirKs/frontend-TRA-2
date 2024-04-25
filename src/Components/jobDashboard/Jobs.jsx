import React, { useEffect, useState } from "react";
import Applayout from "../../Applayout";
import { Table, Tag, Button, Modal, Menu, Tooltip } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  FilterTwoTone,
  StopOutlined,
} from "@ant-design/icons";
import axios from "axios";
import getStatusColor from "../../Utils/getStatusColor";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8070/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setDataSource(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const stopJob = async (jobId) => {
    try {
      const response = await axios.post(
        "http://localhost:8070/jobs/stop",
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // Assuming you want to refresh the job list after stopping a job
      fetchJobs();
      Modal.success({ content: response.data.message });
    } catch (error) {
      console.error("Error stopping job:", error);
      Modal.error({ content: "Failed to stop job" });
    }
  };
  const deleteJob = async (jobId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/jobs/delete/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      fetchJobs();
      Modal.success({ content: response.data.message });
    } catch (error) {
      console.error("Error deleting the job:", error);
      Modal.error({ content: "Failed to delete job" });
    }
  };
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
      render: (_, { status }) => {
        let color = getStatusColor(status);
        return (
          <Tag
            color={color}
            key={status}
            style={{ width: "87px", textAlign: "center" }}
          >
            {status.toString().toUpperCase()}
          </Tag>
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
          <Menu.Item key="Progress"> In Progress</Menu.Item>
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
      render: (text, record) => {
        if (record.status !== "completed" && record.status !== "cancelled") {
          return (
            <>
              <Tooltip placement="left" title={"Stop Job"} color="red">
                <Button type="text" onClick={() => showStopConfirm(record)}>
                  <StopOutlined style={{ color: "red", fontSize: "20px" }} />
                </Button>
              </Tooltip>
            </>
          );
        } else if (record.status == "completed") {
          return (
            <>
              <Tooltip placement="left" title={"Download Report"} color="green">
                <Button
                  type="text"
                  onClick={() => showDownloadConfirm(record)}
                >
                  <DownloadOutlined
                    style={{ color: "green", fontSize: "20px" }}
                  />
                </Button>
              </Tooltip>
            </>
          );
        } else {
          return (
            <>
              <Tooltip placement="left" title={"Delete From List"} color="red">
                <Button type="text" onClick={() => showDeleteConfirm(record)}>
                  <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
                </Button>
              </Tooltip>
            </>
          );
        }
      },
    },
  ];

  const showStopConfirm = (record) => {
    Modal.confirm({
      title: "Are you sure you want to STOP this Job?",
      content: `Job Name: ${record.jobname}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        stopJob(record.job_id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showDownloadConfirm = (record) => {
    Modal.confirm({
      title: "Are You sure want to Download Job Report",
      content: `Job Name : ${record.jobname}`,
      okText: "Yes",
      okType: "default",
      cancelText: "No",
      onOk() {
        console.log("download");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const showDeleteConfirm = (record) => {
    Modal.confirm({
      title: "Are You sure want to Delete Fro List",
      content: `Job Name : ${record.jobname}`,
      okText: "Yes",
      okType: "default",
      cancelText: "No",
      onOk() {
        deleteJob(record.job_id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <Applayout>
      <div className="bg-white p-10 h-screen">
        <h2 style={{ textAlign: "center", fontSize: 25 }}>Job List</h2>
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

export default Jobs;
