import React from "react";

import { ToastContainer } from "react-toastify";
import CustomApp from "../components/CustomApp";
import { MyProvider } from "../context";

import "../public/style.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Apps = ({ Component, props }) => {
  return (
    <MyProvider>
      <CustomApp>
        <ToastContainer position="top-right" />

        <Component {...props} />
      </CustomApp>

      <script
        src={
          "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        }
      ></script>
    </MyProvider>
  );
};

export default Apps;
