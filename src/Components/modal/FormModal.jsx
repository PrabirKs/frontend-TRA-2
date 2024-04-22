import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import JobAddForm from "../forms/JobAddForm";
import NewJobTitile from "./NewJobTitile";
import { Context } from "../../Context/AppProvider";
const FormModal = () => {
  const data = useContext(Context);
  return (
    <>
    
      <Modal
       
        title={<NewJobTitile/>}
        centered
        open={data.modalOpen}
        onOk={() => data.setModalOpen(false)}
        onCancel={() => data.setModalOpen(false)}
        width={1000}
        footer={null}
      >
        <div className="bg-sky-100 h-[80vh] job-add-form-container w-full flex justify-center  ">
          <JobAddForm/>
        </div>
      </Modal>
    </>
  );
};
export default FormModal;
