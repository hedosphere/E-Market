import React from "react";
import { Modal } from "antd";
import { Avatar } from "antd";

const userDetailCard = ({
  showModal,
  setShowModal,
  name,
  setName,
  email,
  setEmail,
  imagePreview,
  setImagePreview,
  imageName,
  setImageName,
  handleImage,
  user,
  loading,
  handleEditProfile,
}) => {
  return (
    <div>
      <Modal
        title={`Edit ${user}`}
        width={"40vw"}
        open={showModal}
        footer={false}
        onCancel={(e) => setShowModal(!showModal)}
      >
        <div className="p-3">
          <form
            encType="multipart/form-data"
            method="POST"
            className="form-group pt-4 px-2"
            // onSubmit={handleSubmit}
          >
            <div className="form-group mb-3">
              <label htmlFor="Name" className="h5 ms-1">
                Name
              </label>
              <input
                id="Name"
                type="text"
                name="text"
                className="form-control form-control-lg"
                // disabled={loading}
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
                // disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="ms-1 h5 mb-4">Image</label>
              <div className="row">
                <div className="col-md-2">
                  <label className="me-1">
                    <Avatar size={53} src={imagePreview} />
                  </label>
                </div>
                <div className="col-md-10">
                  <label className="form-control form-control-lg">
                    <input
                      type="file"
                      className=""
                      hidden
                      // disabled={loading}
                      accept="image/*"
                      onChange={handleImage}
                    />
                    {imageName}
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group my-3">
              <button
                disabled={loading}
                type="submit"
                className=" form-control form-control-lg "
                onClick={handleEditProfile}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default userDetailCard;
