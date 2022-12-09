import React, { useState } from "react";
import RequireAdmin from "../../../components/AdminRoutes/RequireAdmin";
import ProductsForm from "../../../components/forms/ProductForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const create = () => {
  let router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    "This is my defualt descriptions. Don't worry about the content"
  );
  let p = {
    //
  };
  const [category, setCategory] = useState("");
  const [sellers, setSellers] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("Choose Image");
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // functions ---------- --------------------- ------

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(image);
    // return;
    try {
      setLoading(true);
      let myForm = new FormData();
      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      myForm.set("sellers", sellers);
      myForm.set("stock", stock);

      for (let i = 0; i < image.length; i++) {
        myForm.append(`images`, image[i]);
      }

      const { data } = await axios.post("/api/v1/product/create", myForm);

      // console.log("submits all");
      toast(data.message);

      setLoading(false);
      router.push("/admin/product");
      if (data) {
        // console.log("yy");
        setName(""),
          setPrice(""),
          setDescription(""),
          setSellers(""),
          setCategory(""),
          setStock(""),
          setImage(""),
          setImageName("Choose Image"),
          setImagePreview("");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  //

  //

  const handleImage = (p) => {
    let file = p.target.files;
    // let fileimg = p.target.files[0];
    let newImagePreview = [];
    if (!file) return setImageName("Selected Images");

    for (let i = 0; i < file.length; i++) {
      newImagePreview.push(window.URL.createObjectURL(file[i]));
    }

    setImagePreview(newImagePreview);
    setImageName(file.length + " Images are Selected");
    setImage(file);
  };
  // functions ---------- --------------------- ------

  //

  //

  // Variable ---------- --------------------- ------

  const categories = [
    "Select Category",
    "Electronics",
    "Cameras",
    "Phones",
    "Laptops",
    "Accessories",
    "Headphone",
    "Foods",
    "Books",
    "Sports",
    "Homes",
    "Outdoors",
  ];
  // Variable ---------- --------------------- ------

  //

  //
  return (
    <>
      <RequireAdmin>
        <div className="container-fluid">
          <div className="col-md-6 offset-md-3 border bg-warning text-white">
            <h2 className="d-flex justify-content-center mt-3 pt-3 text-danger">
              New Product
            </h2>

            <hr />

            <ProductsForm
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
              category={category}
              categories={categories}
              setCategory={setCategory}
              setDescription={setDescription}
              description={description}
              sellers={sellers}
              setSellers={setSellers}
              stock={stock}
              setStock={setStock}
              image={image}
              setImage={setImage}
              imageName={imageName}
              setImageName={setImageName}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              loading={loading}
              setLoading={setLoading}
              handleImage={handleImage}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </RequireAdmin>

      {/* <pre>
        {JSON.stringify(
          {
            name,
            price,
            category,
            description,
            sellers,
            stock,
            image,
            loading,
          },
          null,
          4
        )} 
      </pre> */}
    </>
  );
};

export default create;
