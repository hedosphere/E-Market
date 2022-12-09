import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const ForgetPassword = ({
  email,
  password,
  viewPassword,
  loading,
  setEmail,
  setPassword,
  setViewPassword,
  setLoading,
  handleSendCode,
  handleResetPassword,
  setCode,
  code,
  setcodeSent,
  codeSent,
}) => {
  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={codeSent ? handleResetPassword : handleSendCode}
        method="POST"
        className="form-group py-4 px-2"
      >
        <div className="form-group mb-3">
          <label htmlFor="Email" className="h5 ms-1">
            Email
          </label>
          <input
            id="Email"
            type="email"
            // disabled={codeSent}
            name="email"
            className="form-control form-control-lg"
            required
            disabled={(loading, codeSent)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div hidden={!codeSent} className="form-group mb-3">
          <label htmlFor="Code" className="h5 ms-1">
            Code
          </label>
          <input
            id="Code"
            hidden={!codeSent}
            type="text"
            name="code"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div hidden={!codeSent} className="form-group mb-3">
          <div className="d-flex h5 ">
            <label htmlFor="Password" className="ms-1">
              New Password
            </label>
            <span
              onClick={(e) => setViewPassword(!viewPassword)}
              className="me-1"
              style={{ marginLeft: "auto" }}
            >
              {viewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          <input
            id="Password"
            // type="text"
            type={viewPassword ? "text" : "password"}
            name="password"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <button
            disabled={loading}
            type="submit"
            className=" form-control form-control-lg "
            onClick={codeSent ? handleResetPassword : handleSendCode}
          >
            {`${codeSent ? "Reset Password" : "Send Code"}`}
            {loading && <SyncOutlined spin />}
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
