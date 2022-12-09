import React, { useContext, useEffect, useState } from "react";

// import { generalContext } from "../../context";
// import { RemoveUser } from "../../context/UserConstant";
// import { useRouter } from "next/router";
import axios from "axios";
import RequireAdmin from "../../components/AdminRoutes/RequireAdmin";
import Link from "next/link";

const index = ({ children }) => {
  //

  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(false);

  let outOfStock = 0;

  products &&
    products.forEach((el) => {
      if (el.stock < 1) {
        outOfStock += 1;
      }
    });

  const getProducts = async (e) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/all");
      // console.log("Home", data);
      data && setProducts(data.product);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect((e) => {
    getProducts();
  }, []);

  //
  return (
    <>
      <RequireAdmin className="">
        <>
          <h1 className="py-3">Dashboard</h1>
          <div className="text-white rounded text-center py-4 bg-primary">
            <div className="h3">Total Amount </div>
            <div className="h3 mt-2 pt-2">N 2,342,231 </div>
          </div>
          <div className="my-3 pt-3 ">
            <div className="row">
              <div className="col-md-3">
                <div className="text-white rounded  bg-success">
                  <div className="h3 text-center pt-3">
                    <div className="">Products</div>
                    <div className="mt-2 pt-1">
                      {products && products.length}{" "}
                    </div>
                  </div>{" "}
                  <hr />
                  <Link href="/admin/product">
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      className="d-flex  pb-2 px-3"
                    >
                      View details{" "}
                      <span style={{ marginLeft: "auto" }}> {">"} </span>{" "}
                    </a>
                  </Link>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-white rounded  bg-warning">
                  <div className="h3 text-center pt-3">
                    <div className="">Orders </div>
                    <div className="mt-2 pt-1">18</div>
                  </div>{" "}
                  <hr />
                  <p className="d-flex  pb-2 px-3">
                    View details{" "}
                    <span style={{ marginLeft: "auto" }}> {">"} </span>{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-white rounded  bg-info">
                  <div className="h3 text-center pt-3">
                    <div className="">Users </div>
                    <div className="mt-2 pt-1">7 </div>
                  </div>{" "}
                  <hr />
                  <p className="d-flex  pb-2 px-3">
                    View details{" "}
                    <span style={{ marginLeft: "auto" }}> {">"} </span>{" "}
                  </p>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-white rounded  bg-danger">
                  <div className="h3 text-center pt-3">
                    <div className="">Out of Stock </div>
                    <div className="mt-2 pt-1">{products && outOfStock}</div>
                  </div>
                  <hr />
                  <p className="d-flex  pb-2 px-3">
                    {" ------ "}
                    <span style={{ marginLeft: "auto" }}>{" ------ "} </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      </RequireAdmin>
    </>
  );
};

export default index;
