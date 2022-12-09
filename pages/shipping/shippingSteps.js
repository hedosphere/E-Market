import React, { useContext, useState, useEffect } from "react";
import { generalContext } from "../../context";
import Link from "next/link";
import { useRouter } from "next/router";

//   ShippingSteps
const shippingSteps = () => {
  const { state } = useContext(generalContext);
  const [shippingStep, setShippingSteps] = useState([]);
  const router = useRouter();
  useEffect((e) => {
    const { ShippingSteps } = state;
    setShippingSteps(ShippingSteps);
  }, []);

  //  /
  return (
    <div className="px-2">
      {/* <pre>{JSON.stringify(shippingStep, null, 4)}</pre> Completed */}
      {shippingStep.includes("Completed") ? (
        <div className="row px-2 mb-2">
          <div className="col pointer  bg-warning myarrow py-3 ">
            <Link href="#shipping">
              <a id="link"> Shipping </a>
            </Link>
          </div>
          <div className="col pointer  bg-warning myarrow py-3 ">
            <Link href="#shipping">
              <a id="link"> Confirm Order </a>
            </Link>
          </div>
          <div className="col pointer  bg-warning myarrow py-3 ">
            <Link href="#shipping">
              <a id="link"> Payment </a>
            </Link>
          </div>
        </div>
      ) : (
        <div className="row px-2 mb-2">
          {shippingStep.includes("Shipping") ? (
            <div
              onClick={(p) => router.push("/shipping")}
              className="col pointer  bg-warning myarrow py-3 "
            >
              <Link href="/shipping">
                <a id="link"> Shipping </a>
              </Link>
            </div>
          ) : (
            <div className="col   bg-secondary myarrow py-3 ">Shipping</div>
          )}
          {shippingStep.includes("ConfirmOrder") ? (
            <div
              onClick={(p) => router.push("/shipping/confirm-order")}
              className="col pointer  bg-warning myarrow py-3 "
            >
              {" "}
              <Link href="/shipping/confirm-order" className=" link">
                <a id="link"> Confirm Order </a>
              </Link>
            </div>
          ) : (
            <div className="col   bg-secondary myarrow py-3 ">
              Confirm Order
            </div>
          )}
          {shippingStep.includes("Payment") ? (
            <div
              onClick={(p) => router.push("/shipping/payment")}
              className="col pointer  bg-warning myarrow py-3 "
            >
              Payment
            </div>
          ) : (
            <div className="col   bg-secondary myarrow py-3 ">Payment</div>
          )}
        </div>
      )}
    </div>
  );
};

export default shippingSteps;
