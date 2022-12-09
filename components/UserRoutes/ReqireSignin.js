import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

//

const RequireSigning = ({ children }) => {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  const fetchUser = async (e) => {
    //
    try {
      const { data } = await axios.get("/api/v1/me");

      // if()

      if (data.ok) setOk(true);
    } catch (err) {
      if (err) {
        setOk(false);
        toast("Please Login first");
      }
      // console.log("err.status", err.response.status);
    }
  };

  useEffect((p) => {
    fetchUser();
  }, []);

  //

  //

  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      let res = error.response;

      if (res.status === 401) {
        // console.log("error response wit axios inter", res.status);
        return router.push("/login");
      }

      return Promise.reject(error);
    }
  );

  //

  //

  //

  return <div>{ok && <>{children}</>}</div>;
};

export default RequireSigning;
