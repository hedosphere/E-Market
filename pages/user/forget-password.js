import React, { useState, useEffect, useContext } from "react";
import ForgetPasswordForm from "../../components/forms/ForgetPasswordForm";
import { toast } from "react-toastify";
import Helmet from "../../components/Helmet";
import { useRouter } from "next/router";
import axios from "axios";

import Link from "next/link";

import { generalContext } from "../../context";

const ForgetPassword = () => {
  const router = useRouter();
  //

  const { state } = useContext(generalContext);

  const { user } = state;
  //

  //  states

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("hedo@hedo.com");
  const [password, setPassword] = useState("");
  const [codeSent, setcodeSent] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  ///   Functions --------------  ------------------------
  let details = {
    email,
    password,
    code,
    loading,
    viewPassword,
  };

  const handleSendCode = async (k) => {
    k.preventDefault();
    setLoading(true);

    try {
      //   console.log("forget password -- handleSendCode");
      const { data } = await axios.post("/api/v1/user/password-reset-code", {
        email,
      });

      setLoading(false);
      setcodeSent(true);
    } catch (err) {
      setcodeSent(false);
      setLoading(false);
      toast.error(err.response.data);

      console.log(password);
    }
  };

  const handleResetPassword = async (k) => {
    k.preventDefault();
    setLoading(true);

    try {
      //   console.log("forget password -- handleSendCode");
      const { data } = await axios.post("/api/v1/user/password-reset", {
        email,
        code,
        password,
      });
      // return;
      setLoading(false);
      setcodeSent(false);
      toast.success("Password reset successfully, Please login");
      router.push("/login");
    } catch (err) {
      // setcodeSent(true);
      setLoading(false);
      toast.error(err.response.data);

      // console.log(password);
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
        <Helmet title="Forget password" />
        <div className="display-2 bg-warning text-center border border-default py-5">
          Reset Password
        </div>
        <div className="container">
          <div className="col-md-4 form offset-md-4 mb-4 bg-warning text-white">
            <ForgetPasswordForm
              email={email}
              setCode={setCode}
              code={code}
              password={password}
              viewPassword={viewPassword}
              loading={loading}
              setEmail={setEmail}
              setPassword={setPassword}
              setViewPassword={setViewPassword}
              setLoading={setLoading}
              codeSent={codeSent}
              setcodeSent={setcodeSent}
              handleSendCode={handleSendCode}
              handleResetPassword={handleResetPassword}
            />
            <>
              <div className="d-flex pb-3 justify-content-center">
                <span className="me-2">Remember Your Login? </span>
                <Link href="/login"> Login </Link>
              </div>

              <div className="d-flex mb-2 pb-4 justify-content-center">
                <span className="me-2"> Don't have an account?. </span>
                <Link href="/register">Register</Link>
              </div>
            </>
          </div>

          <pre>{JSON.stringify(details, null, 4)}</pre>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
