import React, { useState, useEffect, useContext } from "react";
import { Rate, Carousel } from "antd";
import { generalContext } from "../../context/index";
import { useRouter } from "next/router";
import axios from "axios";
import { AddToCart, RemoveFromCart } from "../../context/CartConstant";
import ReviewCard from "../../components/Cards/ReviewCard";

const productId = () => {
  const { state, dispatch } = useContext(generalContext);
  const router = useRouter();
  const { productId } = router.query;

  const [user, setUser] = useState(1);
  const [cartValue, setCartValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [Style, setStyle] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const getproductDetails = async (e) => {
    try {
      const { data } = await axios.get(`/api/v1/product-detail/${productId}`);
      data && setProductDetails(data.product);
      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    let cartDetails = {
      _id: productDetails._id,
      name: productDetails.name,
      image: productDetails.image[0].url,
      description: productDetails.description,
      price: productDetails.price,
      stock: productDetails.stock,
      quantity: cartValue,
    };

    dispatch({
      type: AddToCart,
      payload: cartDetails,
    });

    // console.log(cartDetails);
  };
  const handleCartPlus = (e) => {
    e.preventDefault();
    if (cartValue >= productDetails.stock) return;
    setCartValue((e) => e + 1);
    // console.log(" handleCartPlus ", productDetails.stock);
  };

  const handleCartMinus = (e) => {
    e.preventDefault();

    if (cartValue <= 1) return;
    setCartValue((e) => e - 1);
    // console.log(" handleCartMinus ", productDetails.stock);
  };

  useEffect(
    (e) => {
      productId && getproductDetails();
    },
    [productId]
  );

  useEffect(
    (e) => {
      setUser(state.user);
    },
    [state]
  );
  const contentStyle = {
    height: "250px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    // alert(review.rating);
    setLoading(true);
    try {
      const { data } = await axios.put("/api/v1/create-review", {
        review,
        _id: productDetails._id,
      });
      data && setProductDetails(data.product);
      setLoading(false);
      setShowModal(!showModal);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // ;
  const handleShowModal = (e) => {
    if (!user) {
      router.push(`/login?productRedirect=product/${productId}`);
    } else {
      setShowModal(!showModal);
      let userId = user && user._id;

      // productDetails.review.user
      productDetails &&
        productDetails.review.map((el) => {
          if (el.user._id == userId) {
            setReview({
              rating: el.rating,
              comment: el.comment,
            });
          }
        });
    }
  };
  return (
    <div className="container pt-2">
      {/* productId {productId} */}
      {/* <pre>{JSON.stringify(productDetails, null, 4)}</pre> */}
      {productDetails && (
        <>
          <div className="row ">
            {/* <div className="d-flex justify-content-center   mt-5 pt-5 col-md-5 mt-5 pt-5"> */}
            <div className=" mt-5 pt-5 col-md-5 mt-5 pt-5">
              <Carousel autoplay>
                {productDetails.image &&
                  productDetails.image.map((item, index) => (
                    <div key={index}>
                      <img
                        // height={"100em"}
                        width="90%"
                        style={contentStyle}
                        src={item.url}
                        alt={productDetails.name}
                      />
                    </div>
                  ))}
              </Carousel>
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
              <div className="d-flex mb-4">
                <span
                  onClick={handleCartMinus}
                  className="minus bg-danger pointer py-1  px-2 h4"
                >
                  -
                </span>
                <span className="value mx-1 px-2  py-1">{cartValue}</span>
                <span
                  onClick={handleCartPlus}
                  className="plus bg-primary pointer px-2 h4 me-3 py-1"
                >
                  +
                </span>
                <label
                  //   style={{ borderBottom: "1px solid yellow" }}
                  onClick={handleAddToCart}
                  className="addtocart bg-warning pointer  rounded px-3  h4 py-1"
                >
                  Add to Cart
                </label>
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
              <div className="mb-5">Sold by: {productDetails.sellers}</div>

              <span
                onClick={handleShowModal}
                className="bg-warning pointer  rounded px-3  mt-2 h4 py-1"
              >
                Summit Your Review
              </span>
              <ReviewCard
                review={review}
                handleSubmitReview={handleSubmitReview}
                setReview={setReview}
                showModal={showModal}
                setShowModal={setShowModal}
                loading={loading}
              />
            </div>
          </div>
          <div className="container pb-5">
            {productDetails && productDetails.review && (
              <>
                <h2> Other's Review </h2>
                <hr />
                {/* <Rate allowHalf value={productDetails.ratings} disabled />{" "} */}
                {productDetails.review.map((item) => (
                  <div className="mb-3" key={item._id}>
                    <div>
                      <Rate allowHalf value={item.rating} disabled />{" "}
                    </div>
                    <p className="mb-4">By: {item.user.name}</p>
                    <p>{item.comment}</p>
                    <hr />
                  </div>
                ))}
              </>
            )}
          </div>
          {/* <pre>{JSON.stringify(user && user, null, 4)}</pre> */}
        </>
      )}
    </div>
  );
};

export default productId;
