import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import banner from "./assets/lab3.jpg";
import { Row, Col, Button, Typography } from "antd";
import "./App.css";
import Applayout from "./Applayout";
import FormModal from "./Components/modal/FormModal";
import { Context } from "./Context/AppProvider";

function App() {
  const context = useContext(Context);
  useEffect(() => {
    const user = localStorage.getItem("user")
    context.setUser(user) ;
  },[])
  return (
    <>
      <Applayout>
        <div className="bg-white">
          <Col justify="center" align="middle" style={{ height: "80vh" }}>
            <Col>
              {/* Render your HeroImage component here */}
              <img className="banner-image  absolute h-screen w-screen  object-cover" src={banner} />
            </Col>
            <Col className="h-full flex items-center flex-col justify-center">
              <div className="mb-10">
                <h1 className="font-bold text-4xl banner-header ">
                  Toxicity Report Automation
                </h1>
              </div>
              <div>
                <h2 className="banner-description">
                A comprehensive platform for analyzing and interpreting toxicity lab experiment reports
                </h2>
              </div>

              <Button
                className="my-10 h-[50px] text-[20px] font-bold"
                type="primary"
                onClick={() => {
                  context.setModalOpen(true)
                }}
              >
                Create A Job
              </Button>
            </Col>
          </Col>
        </div>

        <FormModal />
      </Applayout>
    </>
  );
}

export default App;
