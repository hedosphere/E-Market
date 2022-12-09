import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
// import RequireSigning from "./UserRoutes/ReqireSignin";
import UserDetailCard from "../../components/Cards/userDetailCard";
import UserEditPassword from "../../components/Cards/userEditPassword";
import { Avatar } from "antd";

import RequireSigning from "../../components/UserRoutes/ReqireSignin";

import { generalContext } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
const UserInfo = () => {
  const { state } = useContext(generalContext);

  const router = useRouter();
  const [user, setUser] = useState();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [oldImageId, setOldImageId] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [imageName, setImageName] = useState("Change the Image");

  const [showModal, setShowModal] = useState(false);

  // For password chage
  // ;
  const [showPassworModal, setShowPasswordModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [viewoldPassword, setviewoldPassword] = useState(false);
  const [viewnewPassword, setviewnewPassword] = useState(false);
  const [viewconfirmPassword, setviewconfirmPassword] = useState(false);

  // For password chage

  //
  const handleSubmitPassword = async (e) => {
    //
    e.preventDefault();
    // console.log("save password");
    setLoading(true);
    try {
      const { data } = await axios.put("/api/v1/user/edit-password", {
        oldPassword,
        newPassword,
      });
      setLoading(false);
      toast("Saved!");
      setConfirmPassword("");
      setOldPassword("");
      setNewPassword("");
      setShowPasswordModal(!showPassworModal);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const handleEditProfile = async (e) => {
    e.preventDefault();

    setLoading(true);
    let myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("newImage", newImage);
    myForm.append("oldImageId", oldImageId);
    try {
      const { data } = await axios.put("/api/v1/user/edit", myForm);
      console.log(data);
      setShowModal(!showModal);
      setLoading(false);
      setUser(data.user);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // console.log("handleEditProfile", oldImageId);
  };

  const handleShowPasswordModal = (e) => {
    setShowPasswordModal(!showPassworModal);
  };
  const handleShowModal = (e) => {
    e.preventDefault();
    setEmail(user.email);
    setName(user.name);
    setShowModal(!showModal);
    setOldImageId(user.image[0].public_id);
    setImagePreview(user.image[0].url);
  };
  const handleImage = (e) => {
    //
    let file = e.target.files[0];

    setImagePreview(window.URL.createObjectURL(file));
    setNewImage(file);
    setImageName(file.name);
    setOldImageId("");

    // console.log(file.name);
  };
  useEffect(
    (e) => {
      //
      setUser(state.user);
    },
    [state]
  );
  return (
    <RequireSigning>
      <div className="container">
        {user && (
          <div className="ms-5">
            <h1 className="mt-5 ">My Profle</h1>
            <hr />
            <div className="row">
              <div className="col-md-6 d-flex mt-3 justify-content-center">
                <Avatar src={user && user.image[0].url} size={270} />
              </div>
              <div className="col-md-6 mt-3">
                <h2>Name:</h2>
                <h5 className="mb-5">{user.name}</h5>

                <h2>Email:</h2>
                <h5 className="mb-5">{user.email}</h5>

                <h2>Joined On:</h2>
                <h5 className="mb-5">
                  {user && new Date(user.createdAt).toLocaleTimeString()}
                  {" - "}
                  {user && new Date(user.createdAt).toLocaleDateString()}{" "}
                </h5>
              </div>
            </div>
            {/*  */}
            {/*  */}

            <div className="row">
              <div className="col-md-6 mt-3 px-5 ">
                <button
                  onClick={handleShowModal}
                  className="bg-warning form-control"
                >
                  Edit Profile
                </button>
              </div>

              <div className="col-md-6 mt-3 pe-5 ">
                <button
                  onClick={handleShowPasswordModal}
                  className="bg-success form-control"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
        <pre>
          {JSON.stringify(
            { oldPassword, newPassword, confirmPassword },
            null,
            4
          )}
        </pre>

        <>
          {/* {showModal ? "false" : "true"} */}
          <>
            <UserDetailCard
              showModal={showModal}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              setShowModal={setShowModal}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
              imageName={imageName}
              setImageName={setImageName}
              user={user && user.name}
              handleImage={handleImage}
              loading={loading}
              handleEditProfile={handleEditProfile}
            />
          </>

          <>
            {/* For password */}
            <UserEditPassword
              oldPassword={oldPassword}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              //
              setOldPassword={setOldPassword}
              setNewPassword={setNewPassword}
              setConfirmPassword={setConfirmPassword}
              //
              setviewoldPassword={setviewoldPassword}
              setviewnewPassword={setviewnewPassword}
              setviewconfirmPassword={setviewconfirmPassword}
              //
              viewoldPassword={viewoldPassword}
              viewnewPassword={viewnewPassword}
              viewconfirmPassword={viewconfirmPassword}
              //
              user={user && user.name}
              setLoading={setLoading}
              loading={loading}
              showPassworModal={showPassworModal}
              setShowPasswordModal={setShowPasswordModal}
              handleSubmitPassword={handleSubmitPassword}
            />
          </>
        </>
      </div>
    </RequireSigning>
  );
};

export default UserInfo;
