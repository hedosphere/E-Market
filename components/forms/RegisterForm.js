import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const RegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  setLoading,
  image,
  setImage,
  imagePreview,
  setViewPassword,
  viewPassword,
  handleImage,
  imageName,
  handleSubmit,
}) => {
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
          <label className="ms-1 h5">Image</label>
          <div className="d-flex h5 ">
            <label className="me-1">
              <Avatar size={53} src={imagePreview} />
            </label>

            <label className="form-control form-control-lg">
              <input
                type="file"
                className=""
                required
                hidden
                disabled={loading}
                accept="image/*"
                onChange={handleImage}
              />
              {imageName}
            </label>
          </div>
        </div>

        <div className="form-group mb-3">
          <button
            disabled={loading || !name || !email || !password || !imagePreview}
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

export default RegisterForm;
