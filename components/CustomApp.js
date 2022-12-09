import React, { useState, useEffect, useContext } from "react";
import TopNav from "./TopNav";
import axios from "axios";
import { generalContext } from "../context/";
import { UserSuccess } from "../context/UserConstant";

//

const CustomApp = ({ children }) => {
  const { state, dispatch } = useContext(generalContext);
  // console.log(state);
  const fetchUser = async (e) => {
    try {
      const { data } = await axios.get("/api/v1/me");
      // console.log(data);
      data &&
        dispatch({
          type: UserSuccess,
          payload: data.user,
        });
    } catch (err) {
      console.log("No user");
    }
  };

  useEffect((p) => {
    fetchUser();
  }, []);
  return (
    <div>
      <div className="mb-1">
        <TopNav />
      </div>
      <>{children}</>
    </div>
  );
};

export default CustomApp;
