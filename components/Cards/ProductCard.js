import React from "react";
import { Rate } from "antd";

const ProductCard = ({ product, handleDetail }) => {
  const { name, image, ratings, noOfReviews, price, _id } = product;
  return (
    <div>
      <div className="  ">
        <img
          width={"100%"}
          height={"150px"}
          src={image && image.length > 0 && image[0].url}
          alt={name}
        />
      </div>
      <h5 className="mt-3 pt-2">{name}</h5>
      <div className="mt-3">
        <Rate allowHalf value={ratings} disabled />{" "}
        <span> ({noOfReviews} Reviews) </span>
      </div>
      <div className="mt-3 h6 ">N {price.toLocaleString()}</div>
      <div className="mt-3 text-center">
        <span
          onClick={(e) => handleDetail(_id)}
          className="form-control pointer py-2 h3 bg-warning"
        >
          View Details
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
