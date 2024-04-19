import React, { useState } from "react";
import { Button, Modal } from "antd";
import JobAddForm from "../forms/JobAddForm";
import NewJobTitile from "../NewJobTitile";
const FormModal = ({open,setOpen}) => {
  // const [open, setOpen] = useState(false);
  return (
    <>
    
      <Modal
       
        title={<NewJobTitile/>}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={null}
      >
        <div className="bg-blue-50 h-[80vh] job-add-form-container w-full flex justify-center  ">
          <JobAddForm/>
        </div>
      </Modal>
    </>
  );
};
export default FormModal;
