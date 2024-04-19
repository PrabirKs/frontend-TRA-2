import React from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload } from "antd";
import axios from "axios"; // Import Axios
import { useState } from "react";
const JobAddForm = () => {
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

      const reponse = await axios.post("http://localhost:5000/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form data sent successfully");
      console.log(reponse.data);
      // You can do further actions here, like showing a success message
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error, maybe show an error message to the user
    }
  };

  const onFileChange = ({ fileList }) => {
    setFileList(fileList);
  };
  return (
    <Form
      form={form}
      className="flex flex-col w-full mt-10"
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        "input-number": 3,
        "checkbox-group": ["A", "B"],
        rate: 3.5,
        "color-picker": null,
      }}
      style={{
        maxWidth: "100%",
      }}
    >
      <Form.Item
        {...formItemLayout}
        name="TaskName"
        label="Task Name"
        rules={[
          {
            required: true,
            message: "Please write Task Name",
          },
        ]}
      >
        <Input placeholder="Please write Task Name" />
      </Form.Item>

      <div className="file-upload-container overflow-y-auto">
        <Form.Item label="Files">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
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
        name="select"
        label="Report"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select your country!",
          },
        ]}
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
          offset: 6,
        }}
      >
        <Space className="">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default JobAddForm;
