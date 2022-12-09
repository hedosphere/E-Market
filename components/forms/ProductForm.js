import React from "react";
import { SyncOutlined } from "@ant-design/icons";
// import { Rate } from "antd";
import { Avatar } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const ProductsForm = ({
  name,
  setName,
  price,
  setPrice,
  category,
  setCategory,
  categories,
  setDescription,
  description,
  sellers,
  setSellers,
  stock,
  setStock,
  image,
  setImage,
  imageName,
  setImageName,
  imagePreview,
  setImagePreview,
  setLoading,
  loading,
  handleImage,
  handleSubmit,
}) => {
  const FormFiled =
    !loading &&
    (loading ||
      !name ||
      !price ||
      !description ||
      !category ||
      !stock ||
      !sellers ||
      !image)
      ? true
      : false;

  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        method="POST"
        className="form-group py-4 px-2"
      >
        <div className="form-group mb-3">
          <label htmlFor="Name" className="h5 ms-1">
            Name
          </label>
          <input
            id="Name"
            type="text"
            name="name"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Price" className="h5 ms-1">
            Price
          </label>
          <input
            id="Price"
            type="number"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Description" className="h5 ms-1">
            Description
          </label>
          <textarea
            id="Description"
            type="text"
            className="form-control form-control-lg"
            required
            rows={6}
            disabled={loading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Category" className="h5 ms-1">
            Category
          </label>

          <select
            className="form-control form-control-lg"
            value={category}
            required
            disabled={loading}
            id="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories &&
              categories.map((ctgr) => (
                <option
                  // disabled={ctgr === "Select Category"}
                  key={ctgr}
                  value={ctgr}
                >
                  {ctgr}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Sellers" className="h5 ms-1">
            Seller
          </label>
          <input
            id="Sellers"
            type="text"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={sellers}
            onChange={(e) => setSellers(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="stock" className="h5 ms-1">
            Quantity
          </label>
          <input
            id="stock"
            type="number"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label className="ms-1 h5">Image</label>
          <div className=" h5 ">
            <label className="form-control form-control-lg">
              <input
                type="file"
                className=""
                required
                hidden
                multiple
                disabled={loading}
                accept="image/*"
                onChange={handleImage}
              />
              {imageName}
            </label>
          </div>

          <div className="d-flex ">
            {imagePreview &&
              imagePreview.map((imgPrev, index) => (
                <Avatar key={index} className=" me-1" size={45} src={imgPrev} />
              ))}
          </div>
        </div>
        <hr />
        {FormFiled ? (
          <div className="text-danger">Please fill all the inputs </div>
        ) : (
          ""
        )}
        <div
          className={`form-group  ${
            FormFiled && "border-danger"
          } border-bottom mb-3 my-3`}
        >
          <button
            // disabled
            disabled={
              loading ||
              !name ||
              !price ||
              !description ||
              !category ||
              !sellers ||
              !stock ||
              !image
            }
            type="submit"
            className=" form-control form-control-lg "
            onClick={handleSubmit}
          >
            Register {loading && <SyncOutlined spin />}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductsForm;
