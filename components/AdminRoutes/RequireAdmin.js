import React, { useContext, useEffect, useState } from "react";
// import { RemoveUser } from "../../context/UserConstant";
import { generalContext } from "../../context";
import AdminNav from "../AdminNav";
import { useRouter } from "next/router";
import axios from "axios";

const RequireAdmin = ({ children }) => {
  const router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(generalContext);

  const [ok, setOk] = useState(false);

  const fetchAdmin = async (e) => {
    try {
      const { data } = await axios.get("/api/v1/admin");
      if (data.ok) {
        setOk(true);
      }
    } catch (err) {
      setOk(false);
      router.push("/login");
    }
  };
  useEffect((e) => {
    //
    fetchAdmin();
  }, []);
  return (
    <div className="container-fluid">
      {/* {ok ? "true" : "false"} */}

      {ok && (
        <div className="row">
          <div className="col-sm-3 col-md-3  ">
            <div className="p-2" style={{ marginLeft: "-20px" }}>
              <AdminNav />
            </div>
          </div>

          <div className="col">
            {/* {controlAdmin ? "yes" : "no"} <br /> */}
            <>{children}</>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequireAdmin;
