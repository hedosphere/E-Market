import React, { useState, useContext, useEffect } from "react";
import ShippingForm from "../../components/forms/ShippingForm";
import ShippingSteps from "./shippingSteps";
import { generalContext } from "../../context";
import { AddToShippingSteps } from "../../context/shippingConstant";
import { DeleteCart } from "../../context/CartConstant";

import { CheckCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import ReqireSignin from "../../components/UserRoutes/ReqireSignin";
import axios from "axios";
import { Modal } from "antd";
import Link from "next/link";
// import { SyncOutlined } from "@ant-design/icons";

const Payment = () => {
  const { state, dispatch } = useContext(generalContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ok, setOk] = useState(false);
  let router = useRouter();

  const [shippingData, setShippingData] = useState([]);

  const getPaymentStatus = async (e) => {
    // console.log("get Payment Status");
    setLoading(true);

    const reference = JSON.parse(
      sessionStorage.getItem("orderModel")
    ).reference;
    const { data } = await axios.post("/api/v1/payment/getstatus", {
      reference,
    });
    let orderModel = JSON.parse(sessionStorage.getItem("orderModel"));
    if (data) {
      let shippinSteps = ["Shipping", "ConfirmOrder", "Payment"];
      localStorage.setItem("shippinSteps", JSON.stringify(shippinSteps));
      dispatch({
        type: AddToShippingSteps,
        payload: shippinSteps,
      });

      orderModel.paidAt = data.paystack.paidAt;
      orderModel.paymentInfo = {
        status: data.paystack.status,
        reference: orderModel.reference,
        access_code: orderModel.access_code,
      };

      if (data.paystack.status === "Successful") {
        placeOrder(orderModel);
      }
    }
  };
  const placeOrder = async (orderModel) => {
    const { data } = await axios.post("/api/v1/order/create", orderModel);
    if (data) {
      setShowModal(true);

      setLoading(false);
      // alert("Order Placed");
    }
  };
  useEffect((e) => {
    getPaymentStatus();
  }, []);

  const handleState = (e) => {
    if (e) {
      e.preventDefault();
    } else {
      //
    }
    // console.log("e", e);
    let shippinSteps = ["Shipping", "ConfirmOrder", "Payment", "Completed"];
    setShowModal(false);
    localStorage.setItem("shippinSteps", JSON.stringify(shippinSteps));
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippinInfo"); //  DeleteCart
    dispatch({
      type: AddToShippingSteps,
      payload: shippinSteps,
    });
    dispatch({
      type: DeleteCart,
    });

    setOk(true);
  };

  return (
    <ReqireSignin className="">
      {/* <pre>{JSON.stringify(orderModel, null, 4)}</pre> */}
      <Modal
        title="Order Placed successfully"
        open={showModal}
        footer={false}
        onCancel={(e) => {
          setShowModal(false);
          handleState();
        }}
      >
        <div className="container">
          <label
            // style={{ width: "40px" }}
            className="px-5 py-2 bg-success  text-center border "
            onClick={handleState}
          >
            Ok
          </label>
        </div>
      </Modal>
      <div className="d-flex justify-content-center">
        <div className=" col-md-4 mt-5">
          <ShippingSteps />
        </div>
      </div>
      {ok ? (
        <div className="container ">
          <CheckCircleFilled
            style={{ fontSize: "150px" }}
            className="text-success mt-4 pt-1 d-flex justify-content-center"
          />

          <div className="d-flex justify-content-center mt-4 text-warning display-5">
            Order placed successfully.{" "}
          </div>

          <div className="d-flex justify-content-center mt-4 text-warning display-5">
            <Link href={"/user/order"}> Go to your order </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex display-5 justify-content-center text-warning mt-5 pt-5">
          {" "}
          Please wait while your transaction is processing{" "}
        </div>
      )}
    </ReqireSignin>
  );
};

export default Payment;
