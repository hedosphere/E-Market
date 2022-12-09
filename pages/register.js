import React, { useState, useEffect, useContext } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet";
import { useRouter } from "next/router";
import axios from "axios";
// import { UserSuccess } from "../context/UserConstant";
import Link from "next/link";

import { generalContext } from "../context";

const register = () => {
  const router = useRouter();
  //

  const { state } = useContext(generalContext);

  const { user } = state;
  //

  //  states

  const [name, setName] = useState("Kingdom Johowar");
  const [email, setEmail] = useState("hedo@hedo.com");
  const [password, setPassword] = useState("x123456");
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [imageName, setImageName] = useState("Select Image");

  ///   Functions --------------  ------------------------

  const handleImage = (p) => {
    let file = p.target.files[0];
    setImageName(file.name);
    setImagePreview(window.URL.createObjectURL(file));
    setImage(file);
  };
  //

  const handleSubmit = async (k) => {
    setLoading(true);
    k.preventDefault();
    try {
      const myForm = new FormData();
      //
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("image", image);
      const { data } = await axios.post("/api/v1/register", myForm);

      // console.log("submit");
      toast(data.message);
      setLoading(false);

      router.push("/login");
      //
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast(err.response.data);
    }
  };

  ///   Functions --------------  ------------------------

  useEffect(
    (e) => {
      user && router.push("/");
    },
    [user]
  );

  //
  return (
    <>
      <div className="">
        <Helmet title="Register" />
        <div className="display-2 bg-warning text-center border border-default py-5">
          Register
        </div>
        <div className="container">
          <div className="col-md-4 form offset-md-4 mb-4 bg-warning text-white">
            <h2 className="d-flex justify-content-center mt-3 pt-3 text-danger">
              All input are required
            </h2>
            <hr />
            <RegisterForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              setLoading={setLoading}
              image={image}
              setImage={setImage}
              imagePreview={imagePreview}
              setViewPassword={setViewPassword}
              imageName={imageName}
              viewPassword={viewPassword}
              handleImage={handleImage}
              handleSubmit={handleSubmit}
            />{" "}
            <>
              <div className="d-flex pb-3 justify-content-center">
                <span className="me-2"> Have account?. </span>
                <Link href="/login"> Login </Link>
              </div>
            </>
          </div>

          <pre>
            {/* {JSON.stringify({ name, email, password, imagePreview }, null, 4)} */}
          </pre>
        </div>
      </div>
    </>
  );
};

export default register;
