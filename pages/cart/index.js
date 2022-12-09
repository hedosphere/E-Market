import React, { useContext, useState, useEffect } from "react";
import { generalContext } from "../../context";
import { AddToCart, RemoveFromCart } from "../../context/CartConstant";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const CartIndex = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(generalContext);

  const { cartItems, user } = state;
  const [cartItem, setcartItem] = useState("");

  useEffect(
    (e) => {
      setcartItem(cartItems || JSON.parse(localStorage.getItem("cartItems")));
    },
    [cartItems]
  );

  const handleCartRemoveItem = (id) => {
    //
    // console.log(id);

    dispatch({
      payload: id,
      type: RemoveFromCart,
    });
  };

  const handleCartPlus = (id) => {
    const items = cartItems.find((e) => e._id === id);

    if (!items) return;
    let quantity = items.quantity;

    if (items.quantity >= items.stock) return;
    quantity = quantity + 1;

    let cartDetails = {
      _id: items._id,
      name: items.name,
      image: items.image,
      description: items.description,
      price: items.price,
      stock: items.stock,
      quantity: quantity,
    };

    dispatch({
      type: AddToCart,
      payload: cartDetails,
    });
  };

  const handleCartMinus = (id) => {
    //  e.preventDefault();

    const items = cartItems.find((e) => e._id === id);
    // console.log(items);
    // return;

    if (!items) return;
    let quantity = items.quantity;

    // setCartValue((e) => e + 1);
    if (items.quantity <= 1) return;
    quantity = quantity - 1;

    let cartDetails = {
      _id: items._id,
      name: items.name,
      image: items.image,
      description: items.description,
      price: items.price,
      stock: items.stock,
      quantity: quantity,
    };

    dispatch({
      type: AddToCart,
      payload: cartDetails,
    });
  };

  const handleCheckout = (e) => {
    if (user) {
      router.push("/shipping");
    } else router.push("/login?redirect=shipping");
  };
  return (
    <>
      <div className="container">
        {cartItem && (
          <>
            <p className="mt-5 h1">
              My Cart: <b> {cartItem.length} items</b>
            </p>
            {cartItem.length > 0 ? (
              <div className="row">
                <div className="col-md-9  px-1">
                  <div className="">
                    <hr />{" "}
                    {cartItem &&
                      cartItem.map((item, index) => (
                        <div key={index} className="p-2">
                          <div className="row  ">
                            <div className="col-md-3 my-2">
                              <img
                                width={"100%"}
                                height={"100px"}
                                src={item.image}
                                alt={item.name}
                              />
                            </div>

                            <div className="col-md-3 my-2 ">
                              {item.description}
                            </div>

                            <div className="col-md-2 h4 my-2 text-warning">
                              N {item.price.toLocaleString()}
                            </div>

                            <div className="col-md-3 my-2 ">
                              <div className="d-flex">
                                <div
                                  onClick={(e) => handleCartMinus(item._id)}
                                  className="minus bg-danger pointer py-1  px-2 h4"
                                >
                                  -
                                </div>
                                <div className="value mx-1 px-2  py-1">
                                  {item.quantity}
                                </div>
                                <div
                                  onClick={(e) => handleCartPlus(item._id)}
                                  className="plus bg-primary pointer px-2 h4 me-3 py-1"
                                >
                                  +
                                </div>
                              </div>
                            </div>

                            <div
                              onClick={(e) => handleCartRemoveItem(item._id)}
                              className="col-md-1 my-2  text-danger h5"
                            >
                              <DeleteOutlined className="pointer" />
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="col-md-3 mt-4 ">
                  <div className="border p-3">
                    <div className="h5 mt-3">Order Summary </div>
                    <hr />
                    <div className="mb-3 d-flex ">
                      Subtotal:{" "}
                      <label className="h5" style={{ marginLeft: "auto" }}>
                        {cartItem.reduce((i, c) => i + c.quantity, 0)} (units)
                      </label>
                    </div>

                    <div className="mb-4 d-flex ">
                      Est. Total:{" "}
                      <label className="h5" style={{ marginLeft: "auto" }}>
                        N{" "}
                        {cartItem
                          .reduce((i, c) => i + c.quantity * c.price, 0)
                          .toLocaleString()}
                      </label>
                    </div>
                    <hr />

                    <label
                      onClick={handleCheckout}
                      className="bg-warning rounded form-control text-center h3 pointer"
                    >
                      {!user ? "Login to Check Out" : "Check Out"}
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex flex-column align-items-center ">
                  <Link href="/">Start shopping</Link>
                </div>
              </>
            )}{" "}
          </>
        )}
      </div>
    </>
  );
};

export default CartIndex;
