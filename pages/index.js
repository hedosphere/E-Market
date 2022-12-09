import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import { Helmet } from "react-helmet";
import Helmet from "../components/Helmet";
import ProductCard from "../components/Cards/ProductCard";

const index = () => {
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);

  const getProducts = async (e) => {
    // e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/all");
      // console.log("Home", data);
      data && setProduct(data.product);
      // toast(data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect((e) => {
    getProducts();
  }, []);

  const handleDetail = (productId) => {
    router.push(`/product/${productId}`);
  };
  return (
    <div className="container">
      <Helmet title="Home" />
      {loading ? (
        "Please wait..."
      ) : (
        <>
          <h1 className="mt-3 pt-3"> Latest Products</h1>
          <div className="row p-2">
            {product &&
              product.map((item) => (
                <div key={item._id} className="col-md-3 mt-4  ">
                  <div style={{ height: "100%" }} className=" p-2 border  ">
                    <ProductCard product={item} handleDetail={handleDetail} />
                  </div>
                </div>
              ))}
          </div>
          {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}
        </>
      )}
    </div>
  );
};

export default index;
