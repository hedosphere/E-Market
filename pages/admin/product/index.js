import React, { useState, useEffect } from "react";
import RequireAdmin from "../../../components/AdminRoutes/RequireAdmin";
import axios from "axios";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useRouter } from "next/router";

const AdminProduct = () => {
  const router = useRouter();
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (productId) => {
    router.push(`/admin/product/delete/${productId}`);
  };

  return (
    <RequireAdmin>
      {!loading && (
        <div className="container">
          <h1 className="my-5 ">All Products</h1>
          <div className="p-1 ">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  {/* <th scope="col">Status</th> */}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => (
                    <tr key={index + 1}>
                      <th scope="row">{index + 1}</th>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>N{product.price.toLocaleString()}</td>
                      <td>{product.stock}</td>
                      <td className="">
                        <EditTwoTone className="pointer  " title="Edit " />{" "}
                        <span className="mx-2">|</span>
                        <DeleteTwoTone
                          className="pointer text-danger "
                          twoToneColor="red"
                          title="Delete "
                          onClick={(e) => handleDelete(product._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <pre>{order && JSON.stringify(order, null, 4)}</pre> */}
          </div>
        </div>
      )}
    </RequireAdmin>
  );
};

export default AdminProduct;
