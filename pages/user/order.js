import React, { useState, useEffect, useContext } from "react";
import RequireSigning from "../../components/UserRoutes/ReqireSignin";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { generalContext } from "../../context";
import OrderDetailSCard from "../../components/Cards/OrderDetailSCard";

const order = () => {
  // axios
  const { state, dispatch } = useContext(generalContext);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [showModal, setShowModal] = useState(false);

  const getOrders = async (e) => {
    // console.log("get orders");
    const { data } = await axios.get("/api/v1/user/order");
    setOrders(data);
  };
  // console.log(state);

  useEffect(
    (e) => {
      // dispat
      const { user } = state;
      setUser(user);
    },
    [state]
  );

  useEffect((e) => {
    getOrders();
  }, []);
  return (
    <RequireSigning>
      <div className="container">
        <h1 className="my-5 ">My Oders</h1>
        <div className="p-1 ">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order ID</th>
                <th scope="col">Num of Items</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>{order._id}</td>
                    <td>{order.orderItems.length}</td>
                    <td>N{order.totalPrice.toLocaleString()}</td>

                    {order.orderStatus === "Proccessing" ? (
                      <td className=" text-danger">{order.orderStatus}</td>
                    ) : (
                      <td className=" text-success">{order.orderStatus}</td>
                    )}
                    <td className="text-primary ">
                      <EyeOutlined
                        onClick={(e) => {
                          setShowModal(!showModal);
                          setOrder(order);
                        }}
                        title="detail"
                        className="pointer ms-3"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* <pre>{order && JSON.stringify(order, null, 4)}</pre> */}
          <div className="  p-1      ">
            <OrderDetailSCard
              setShowModal={setShowModal}
              user={user}
              showModal={showModal}
              order={order}
            />
          </div>
        </div>
      </div>
    </RequireSigning>
  );
};

export default order;
