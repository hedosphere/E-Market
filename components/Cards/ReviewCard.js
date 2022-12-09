import React from "react";
import { Modal, Rate } from "antd";

const ReviewCard = ({
  handleSubmitReview,
  showModal,
  review,
  loading,
  setReview,
  setShowModal,
}) => {
  return (
    <div>
      <Modal
        title="never"
        width={"45vw"}
        open={showModal}
        footer={false}
        onCancel={(e) => setShowModal(!showModal)}
      >
        <div className="form">
          <form onSubmit={handleSubmitReview} className="form-group">
            <div>
              <Rate
                onChange={(e) => setReview({ ...review, rating: e })}
                value={review.rating}
                className="display-5 h2"
                allowHalf
              />
            </div>
            <textarea
              type="text"
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
              rows={6}
              //   cols={6}
              className="mt-3 form-control"
            ></textarea>
            <button
              disabled={loading}
              className="form-control form-control-lg mt-4 bg-warning"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        {/* <pre>{JSON.stringify(review,null,4)}</pre> */}
      </Modal>
    </div>
  );
};

export default ReviewCard;
