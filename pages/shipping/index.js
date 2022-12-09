import React, { useState, useContext, useEffect } from "react";
import ShippingForm from "../../components/forms/ShippingForm";
import ShippingSteps from "./shippingSteps";
import { generalContext } from "../../context";
import ReqireSignin from "../../components/UserRoutes/ReqireSignin";

import {
  AddToShippingSteps,
  AddToShippingInfo,
} from "../../context/shippingConstant";
import { useRouter } from "next/router";

const shipping = () => {
  const { state, dispatch } = useContext(generalContext);
  const [loading, setLoading] = useState(false);
  const [cartQty, setcartQty] = useState(0);
  let router = useRouter();
  const [values, setValues] = useState({
    address: "",
    city: "",
    state: "",
    phoneNo: "",
    postalCode: "",
    country: "Andorra",
  });
  const handleValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    let shippinSteps = ["Shipping", "ConfirmOrder"];
    localStorage.setItem("shippinSteps", JSON.stringify(shippinSteps));
    localStorage.setItem("shippinInfo", JSON.stringify(values));
    dispatch({
      type: AddToShippingSteps,
      payload: shippinSteps,
    });
    dispatch({
      type: AddToShippingInfo,
      payload: values,
    });
    setLoading(false);
    router.push("/shipping/confirm-order");
  };

  useEffect(
    (e) => {
      //
      const { cartItems, ShippingInfo } = state;
      if (ShippingInfo) {
        setValues({
          ...values,
          state: ShippingInfo.state,
          country: ShippingInfo.country,
          postalCode: ShippingInfo.postalCode,
          phoneNo: ShippingInfo.phoneNo,
          city: ShippingInfo.city,
          address: ShippingInfo.address,
        });
      }
      const quantity = cartItems.reduce((ini, cu) => ini + cu.quantity, 0);
      setcartQty(quantity);
      if (quantity < 1) {
        router.push("/");
      }
    },
    [cartQty]
  );

  return (
    <ReqireSignin>
      <div className="d-flex  justify-content-center">
        <div className="mt-5  col-md-4 ">
          <ShippingSteps />
          <div className=" border p-3 ">
            <div className="shipping-info text-center  h1"> Shipping Info </div>
            <br />
            <hr />{" "}
            <ShippingForm
              values={values}
              handleSubmit={handleSubmit}
              handleValues={handleValues}
              loading={loading}
            />
          </div>
        </div>
        {/* {JSON.stringify(cartQty, null, 4)} */}
      </div>
    </ReqireSignin>
  );
};

export default shipping;
