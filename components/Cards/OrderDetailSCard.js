import React from "react";
import { Modal } from "antd";

const OrderDetailSCard = ({ showModal, user, setShowModal, order }) => {
  return (
    <div>
      <Modal
        title={`Order: #${order && order._id}`}
        width={"70vw"}
        open={showModal}
        footer={false}
        onCancel={(e) => setShowModal(false)}
      >
        <div className="container">
          <h4>Shipping Info:</h4>
          <hr />
          <div className="ps-4">
            <p>
              <b> Name: </b> {user && user.name}
            </p>
            <p>
              <b> Phone: </b> {order && order.shippingInfo.phoneNo}
            </p>

            <p>
              <b> Address: </b>{" "}
              {`${order && order.shippingInfo.address},
              ${order && order.shippingInfo.state}, ${
                order && order.shippingInfo.postalCode
              }
              ${order && order.shippingInfo.country}`}
            </p>
            <p>
              <b> Amount: </b>N {order && order.totalPrice.toLocaleString()}
            </p>
          </div>{" "}
          <hr />
          <h4>
            Payment: <span className="text-success mt-3">PAID</span>
          </h4>
          <h4 className="my-3">
            Date:{" "}
            <span className="text-default mt-3">
              {new Date(order && order.paidAt).toLocaleDateString()} -{" "}
              {new Date(order && order.paidAt).toLocaleTimeString()}
            </span>
          </h4>
          {/* <h4 className="mt-4">Order Status:</h4> */}
          {order && order.orderStatus == "Proccessing" ? (
            <h4 className="mt-3">
              Order Status:{" "}
              <span className="text-danger mt-3">
                {order && order.orderStatus}
              </span>
            </h4>
          ) : (
            <h4 className="mt-4">
              Order Status:{" "}
              <span className="text-success mt-3">
                {order && order.orderStatus}
              </span>
            </h4>
          )}
          <hr />
          <h4>Order Items</h4>
          <hr />
          <div className="ms-4">
            {order &&
              order.orderItems.map((item, index) => (
                <div key={index} className=" mb-3 pb-2">
                  <div key={index} className="row">
                    <div className="col-md-2 p-2">
                      <img
                        height={"50px"}
                        width="80%"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-6 ">
                      {item.description.substring(0, 150)}
                    </div>

                    <div className="col-md-2 ">
                      N{item.price && item.price.toLocaleString()}
                    </div>

                    <div className="col-md-2 ">
                      {item.quantity && item.quantity} Piece(s)
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
          {/* <pre>{order && JSON.stringify(user quantity && user, null, 4)}</pre> Proccessing */}
          {/* <pre>{order && JSON.stringify(order, null, 4)}</pre> */}
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetailSCard;
