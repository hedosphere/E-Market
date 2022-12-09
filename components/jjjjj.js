import React, { useState, useEffect, useContext } from "react";
import { Rate, Carousel } from "antd";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import RequireAdmin from "../../../../components/AdminRoutes/RequireAdmin";

// import RequireAdmin from "../../../components/AdminRoutes/RequireAdmin";

import Link from "next/link";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";

const DeleteproductId = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [productDetails, setProductDetails] = useState();

  const getproductDetails = async (e) => {
    try {
      const { data } = await axios.get(`/api/v1/product-detail/${productId}`);
      data && setProductDetails(data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    (e) => {
      productId && getproductDetails();
    },
    [productId]
  );

  // ;
  const handleDelete = async (e) => {
    let response = window.confirm(
      `Are you sure you want to delete ${productDetails.name}? Once you delete, All item recorded will be destroy!`
    );

    if (!response) {
      return;
    }

    // console.log("response ", response);
    try {
      const { data } = await axios.put(`/api/v1/delete-product/${productId}`);
      toast(productDetails.name + " is deleted");

      router.push("/admin/product");
    } catch (err) {
      console.log(err);
    }

    //

    //
  };
  return (
    <>
      <RequireAdmin>
        {/* {JSON.stringify(productDetails, null, 4)} <br /> */}
        <div>
          <div className="container pt-2">
            {productDetails && (
              <>
                <Link href="/admin/product">
                  <a>
                    <ArrowLeftOutlined title="Go back" className="me-3 " />
                    <span className=""> Go back </span>
                  </a>
                </Link>

                <div className="row ">
                  <div className=" mt-5 pt-5 col-md-5 mt-5 pt-5">
                    <>
                      <Carousel autoplay>
                        {productDetails.image &&
                          productDetails.image.map((item, index) => (
                            <div key={index}>
                              <img
                                // height={"100em"}
                                width="90%"
                                style={{
                                  height: "250px",
                                  color: "#fff",
                                  lineHeight: "160px",
                                  textAlign: "center",
                                  background: "#364d79",
                                }}
                                src={item.url}
                                alt={productDetails.name}
                              />
                            </div>
                          ))}
                      </Carousel>

                      <div className="container pt-2 ">
                        {productDetails &&
                          productDetails.review &&
                          productDetails.review.length > 0 && (
                            <>
                              <h2> Reviews </h2>
                              <hr />
                              {/* <Rate allowHalf value={productDetails.ratings} disabled />{" "} */}
                              {productDetails.review.map((item) => (
                                <div className="mb-3" key={item._id}>
                                  <div>
                                    <Rate
                                      allowHalf
                                      value={item.rating}
                                      disabled
                                    />{" "}
                                  </div>
                                  <p className="mb-4">By: {item.user.name}</p>
                                  <p>{item.comment}</p>
                                  <hr />
                                </div>
                              ))}
                            </>
                          )}
                      </div>
                    </>
                  </div>
                  <div className="col-md-5">
                    <h2 className="mb-3">{productDetails.name}</h2>
                    <p>Product#: {productDetails._id}</p>
                    <hr />
                    <div className="rating">
                      <Rate allowHalf value={productDetails.ratings} disabled />{" "}
                    </div>
                    <hr />
                    <div className="price h2 mb-3">
                      N {productDetails.price.toLocaleString()}
                    </div>

                    <hr />

                    <h5 className="mb-4">
                      Status: {""}
                      {productDetails.stock > 0 ? (
                        <span className="text-primary">
                          {productDetails.stock + " In stock"}
                        </span>
                      ) : (
                        <span className="text-danger">Out of Stock</span>
                      )}
                    </h5>
                    <hr />
                    <div className="mb-3">
                      <h3>Description: </h3>
                      <p>{productDetails.description}</p>
                    </div>
                    <hr />
                    <div className="mb-5">
                      Sold by: {productDetails.sellers}
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div
                    onClick={handleDelete}
                    className="bg-danger text-center display-5 rounded mb-5 pointer"
                  >
                    Delete
                  </div>
                </div>
                {/* <pre>{JSON.stringify(user && user, null, 4)}</pre> */}
              </>
            )}
          </div>
        </div>
      </RequireAdmin>
    </>
  );
};

export default DeleteproductId;
