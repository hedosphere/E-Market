import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const RegisterForm = ({
  setviewoldPassword,
  setviewnewPassword,
  setviewconfirmPassword,

  viewoldPassword,
  viewnewPassword,
  viewconfirmPassword,

  setOldPassword,
  setNewPassword,
  setConfirmPassword,

  oldPassword,
  newPassword,
  confirmPassword,

  showPassworModal,
  setShowPasswordModal,
  loading,
  handleSubmitPassword,
  user = "Please Log in first",
}) => {
  let Passwordmatch = newPassword == confirmPassword;
  return (
    <>
      <Modal
        title={`Edit ${user} Password`}
        width={"40vw"}
        open={showPassworModal}
        footer={false}
        onCancel={(e) => setShowPasswordModal(!showPassworModal)}
      >
        <div className="px-3 pb-3">
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmitPassword}
            method="POST"
            className="form-group py-4 px-2"
          >
            <div className="form-group mb-3">
              <div className="d-flex h5 ">
                <label htmlFor="OldPassword" className="ms-1">
                  Old Password
                </label>
                <span
                  onClick={(e) => setviewoldPassword(!viewoldPassword)}
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                >
                  {viewoldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              <input
                id="OldPassword"
                // type="text"
                type={viewoldPassword ? "text" : "password"}
                name="password"
                className="form-control form-control-lg"
                required
                disabled={loading}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <div className="d-flex h5 ">
                <label htmlFor="NewPassword" className="ms-1">
                  New Password
                </label>
                <span
                  onClick={(e) => setviewnewPassword(!viewnewPassword)}
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                >
                  {viewnewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </span>
              </div>
              <input
                id="NewPassword"
                // type="text"
                type={viewnewPassword ? "text" : "password"}
                name="password"
                className="form-control form-control-lg"
                required
                disabled={loading}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <div className="d-flex h5 ">
                <label htmlFor="ConfirmNewPassword" className="ms-1">
                  Confirm New Password
                </label>
                <span
                  onClick={(e) => setviewconfirmPassword(!viewconfirmPassword)}
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                ></span>
              </div>
              <input
                id="ConfirmNewPassword"
                type="password"
                name="password"
                className={`form-control form-control-lg ${
                  confirmPassword && !Passwordmatch && "border-danger"
                }`}
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <button
                disabled={
                  loading ||
                  !newPassword ||
                  !Passwordmatch ||
                  !confirmPassword ||
                  !oldPassword
                }
                type="submit"
                className=" form-control form-control-lg "
                onClick={handleSubmitPassword}
              >
                Save {loading && <SyncOutlined spin />}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
