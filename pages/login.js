import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/forms/LoginForm";
import { toast } from "react-toastify";
import Helmet from "../components/Helmet";
import Link from "next/link";
import axios from "axios";
import { generalContext } from "../context";
import { UserSuccess } from "../context/UserConstant";

const login = () => {
  const router = useRouter();
  ///   Context --------------  ------------------------

  const { state, dispatch } = useContext(generalContext);

  const { user } = state;

  //
  //
  ///   Context --------------  ------------------------
  //
  //

  ///   states --------------  ------------------------
  //

  const [email, setEmail] = useState("hedo@hedo.com");
  const [password, setPassword] = useState("x123456");
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  ///   states --------------  ------------------------

  //
  const { redirect, productRedirect } = router.query;

  ///   Functions --------------  ------------------------
  // console.log(productRedirect, redirect, router.query);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      // console.log("login subm");
      // return;
      const { data } = await axios.post("/api/v1/login", {
        email,
        password,
      });

      // console.log("submit", router.query.redirect);
      data &&
        dispatch({
          type: UserSuccess,
          payload: data.user,
        });
      toast(data.message);
      setLoading(false);
      if (productRedirect) {
        router.push(`/${productRedirect}`);
      } else if (redirect) {
        router.push("/shipping");
      } else {
        // router.push(`/${productRedirect}`);
        router.push("/");
      }

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
      if (user) {
        if (productRedirect) {
          router.push(`/${productRedirect}`);
        } else if (redirect) {
          router.push("/shipping");
        } else {
          router.push("/");
        }
      }
    },
    [user]
  );

  //
  return (
    <>
      <div className="">
        <Helmet title="Login" />
        <div className="display-2 bg-warning text-center border border-default py-5">
          Login
        </div>
        <div className="container">
          <div className="col-md-4 form offset-md-4 bg-warning text-white">
            <h2 className="d-flex justify-content-center mt-3 pt-3 text-danger">
              All input are required
            </h2>
            <hr />
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              setLoading={setLoading}
              setViewPassword={setViewPassword}
              viewPassword={viewPassword}
              handleSubmit={handleSubmit}
            />
            <>
              <div className="d-flex mb-2 justify-content-center">
                <span className="me-2"> Don't have an account?. </span>
                <Link href="/register">Register</Link>
              </div>
              <div className="d-flex pb-2 justify-content-center">
                <Link href="/user/forget-password"> Forget Password </Link>
              </div>
            </>
          </div>

          {/* <pre>{JSON.stringify({ email, password }, null, 4)}</pre> */}
        </div>
      </div>
    </>
  );
};

export default login;
