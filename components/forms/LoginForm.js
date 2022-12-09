import React from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  setViewPassword,
  viewPassword,
  handleSubmit,
}) => {
  return (
    <>
      <form
        encType="multipart/form-data"
        method="POST"
        className="form-group pt-4 px-2"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="Email" className="h5 ms-1">
            Email
          </label>
          <input
            id="Email"
            type="email"
            name="email"
            className="form-control form-control-lg"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <div className="d-flex h5 ">
            <label htmlFor="Password" className="ms-1">
              Password
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
            disabled={loading || !email || !password}
            type="submit"
            className=" form-control form-control-lg "
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
