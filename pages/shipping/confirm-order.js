import React, { useState, useContext, useEffect } from "react";
import ShippingForm from "../../components/forms/ShippingForm";
import ShippingSteps from "./shippingSteps";
import { generalContext } from "../../context";
// import { AddToShippingSteps } from "../../context/shippingConstant";
import { useRouter } from "next/router";
import ReqireSignin from "../../components/UserRoutes/ReqireSignin";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";

const shipping = () => {
  const { state, dispatch } = useContext(generalContext);
  const [loading, setLoading] = useState(false);
  let router = useRouter();

  const [shippingInfo, setShippingInfo] = useState([]);
  const [cart, setCart] = useState("");
  const [user, setUser] = useState("");
  // console.log("state", state);

  const cartPrice = cart && cart.reduce((ini, cur) => ini + cur.price, 0);

  const shippingPrice = cartPrice < 20000 ? 100 : 0;

  const tax = (cartPrice * 7.5) / 100;

  const total = cartPrice + shippingPrice + tax;

  let orderModel = {
    itemPrice: cartPrice,
    taxPrice: tax,
    shippingPrice,
    totalPrice: Number(total).toFixed(1),
    orderItems: cart,
    shippingInfo,
  };

  useEffect(
    (e) => {
      const { ShippingInfo, cartItems, user } = state;
      setCart(cartItems);
      setUser(user);
      setShippingInfo(ShippingInfo);
      if (!state.ShippingSteps.includes("ConfirmOrder"))
        router.push("/shipping");
    },
    [state]
  );
  const handlePayments = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post("/api/v1/order/geturl", {
      email: user.email,
      price: Number(total).toFixed(1),
    });
    if (data) {
      orderModel.access_code = data.access_code;
      orderModel.reference = data.reference;
    }
    // alert(data.authorization_url);

    sessionStorage.setItem("orderModel", JSON.stringify(orderModel));
    setLoading(false);

    router.push(data.authorization_url);
  };

  return (
    <ReqireSignin className="">
      {/* <pre>{JSON.stringify(orderModel, null, 4)}</pre> */}
      <div className="d-flex justify-content-center">
        <div className=" col-md-4 mt-5">
          <ShippingSteps />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h2>Shipping Info:</h2>
            <hr />
            <div className="ps-4 mb-4">
              <p>
                <b> Name: </b> {user && user.name}
              </p>
              <p>
                <b> Phone: </b>
                {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p>
                <b> Address: </b>
                {shippingInfo &&
                  `${shippingInfo.address}, ${shippingInfo.city},  ${shippingInfo.postalCode}, ${shippingInfo.state}  ${shippingInfo.country} `}
              </p>
            </div>
            <hr />
            <h2 className="pt-4">Cart Items:</h2>
            <hr />
            <div className="ps-4 pt-2 ">
              {cart &&
                cart.map((item) => (
                  <div className=" pb-2" key={item._id}>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          height={"50px"}
                          width="70px"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="col-md-6">{item.name}</div>
                      <div className="col-md-4">
                        {`${
                          item.quantity
                        } X  N${item.price.toLocaleString()} = `}
                        <b>N{(item.price * item.quantity).toLocaleString()}</b>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-3 pt-3">
            <div className=" p-3 mt-5 border">
              <h4>Order Summary</h4>
              <hr />
              <p className="d-flex mb-3">
                Subtotal:{" "}
                <b style={{ marginLeft: "auto" }}>
                  N{cartPrice.toLocaleString()}
                </b>
              </p>

              <p className="d-flex mb-3">
                Shipping: <b style={{ marginLeft: "auto" }}>N{shippingPrice}</b>
              </p>
              <p className="d-flex mb-3">
                Tax:{" "}
                <b style={{ marginLeft: "auto" }}>N{tax.toLocaleString()}</b>
              </p>

              <hr />
              <p className="d-flex ">
                Total Price:{" "}
                <b style={{ marginLeft: "auto" }}>N{total.toLocaleString()}</b>
              </p>
              <hr className="mb-3" />

              <button
                disabled={loading}
                onClick={handlePayments}
                className="bg-warning form-control rounded text-center mt-4"
              >
                Proceed to Payment {loading && <SyncOutlined spin />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReqireSignin>
  );
};

export default shipping;
