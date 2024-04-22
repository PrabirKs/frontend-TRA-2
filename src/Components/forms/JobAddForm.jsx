import React, { useContext } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Upload } from "antd";
import axios from "axios"; // Import Axios
import { useState } from "react";
import { Context } from "../../Context/AppProvider";
const JobAddForm = () => {
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

      const reponse = await axios.post("http://localhost:5000/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Form data sent successfully");
      console.log(reponse.data);
      form.resetFields(); // Reset form fields
      setFileList([]); // Clear file list
      data.setModalOpen(false);
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error, maybe show an error message to the user
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
        name="selectModel"
        label="Model"
        hasFeedback
        initialValue={"TRA MODEL 1"}
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
        rules={[
          {
            defaultField: "xlsx",
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
          offset: 16,
        }}
      >
        <Space className="ml-4">
          <Button htmlType="reset">reset</Button>
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
