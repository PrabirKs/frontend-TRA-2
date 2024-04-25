import React, { useContext } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { Context } from "../../Context/AppProvider";
import { useNavigate } from "react-router-dom";
const JobAddForm = () => {
  const navigate = useNavigate();
  const data = useContext(Context);
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Modified onFinish function to send data to backend
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      const reponse = await axios.post("http://localhost:8070/jobs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      message.success("Job created successfully");
      console.log(reponse.data);
      form.resetFields(); 
      setFileList([]); // Clear file list
      data.setModalOpen(false);
      navigate("/jobs")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Invalid token or not logged in
        message.error("Please login to create a job");
        // Redirect to login page or handle as appropriate
      } else {
        message.error("Failed to create job. Please try again later.");
        console.error("Error creating job:", error);
      }
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleSubmitClick = () => {};
  return (
    <Form
      form={form}
      className="flex flex-col w-full mt-10 p-5 pt-0"
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        selectModel: "TRA MODEL 1",
        select: "xlsx",
      }}
      style={{
        maxWidth: "100%",
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="jobname"
        label="Job Name"
        rules={[
          {
            required: true,
            message: "Please write a Job Name",
          },
        ]}
      >
        <Input placeholder="Please Write a Job Name" />
      </Form.Item>

      <div className="file-upload-container">
        <Form.Item label="Files">
          <Form.Item
            name="files" //dragger
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[
              {
                required: true,
                message: "Please upload files",
              },
            ]}
          >
            <Upload.Dragger
              name="files"
              multiple={true}
              fileList={fileList}
              onChange={onFileChange}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </div>

      <Form.Item
        name="selectModel"
        label="Model"
        hasFeedback
      >
        <Select placeholder="Please select a Model">
          <Option value="TRA MODEL 1">TRA MODEL 1</Option>
          <Option value="TRA MODEL 2">TRA MODEL 2</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="select"
        label="Output"
        hasFeedback
      >
        <Select placeholder="Please select a format for your output report">
          <Option value="csv">CSV</Option>
          <Option value="xlsx">XLSX</Option>
          <Option value="pbix">PBIX</Option>
          <Option value="tbix">TBIX</Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 16,
        }}
      >
        <Space className="">
          <Button htmlType="reset">Reset</Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleSubmitClick();
            }}
          >
            Create
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default JobAddForm;
