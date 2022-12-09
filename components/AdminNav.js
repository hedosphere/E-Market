import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { generalContext } from "../context";
import { RemoveUser } from "../context/UserConstant";
import { StarOutlined } from "@ant-design/icons";
import axios from "axios";

// import { Dropdown, Menu, Space, Avatar } from "antd";

const AdminNav = () => {
  const route = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(generalContext);

  const [navLink, setNavLink] = useState("");

  const handleLogout = async (e) => {
    // console.log("logout");
    try {
      const data = await axios.get("/api/v1/logout");
      dispatch({ type: RemoveUser });
      route.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(
    (e) => {
      process.browser && setNavLink(window.location.pathname);
    },
    [process.browser && window.location.pathname]
  );
  return (
    <div
      className="bg-dark"
      style={{
        fontSize: "20px",
        marginTop: "-20px",
        paddingTop: "15px",
        height: "90vh",
      }}
    >
      <>
        {" "}
        <nav
          //   style={{ }}
          className="navbar   navbar-dark bg-dark"
        >
          <div className="container">
            <div className=" navbar-collapse" id="navbarTogglerzx">
              <ul className="navbar-nav me-auto pt-3 my-3 mb-lg-0">
                <li className="nav-item mb-4">
                  <Link href="/admin/dashboard">
                    <a
                      className={`nav-link ${
                        navLink === "/admin/dashboard" &&
                        "active ps-2 rounded-bottom    border-start border-bottom "
                      } `}
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>

                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}

                <li
                  className={`nav-item dropdown mb-4
                   ${
                     navLink === "/admin/product/create" &&
                     "active ps-2 rounded-bottom    border-start border-bottom "
                   }                  
                  ${
                    navLink === "/admin/product" &&
                    "active ps-2 rounded-bottom    border-start border-bottom "
                  }`}
                >
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Products
                  </a>

                  <ul className="dropdown-menu ps-1 bggray ">
                    <li className="nav-item ">
                      <Link href="/admin/product">
                        <a
                          className={`text-white nav-link  h6 dropdown-item ${
                            navLink === "/admin/product" &&
                            "active bgyellow border border-warning "
                          } `}
                          aria-current="page"
                        >
                          All Products
                        </a>
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link href="/admin/product/create">
                        <a
                          className={`text-white nav-link  h6 dropdown-item ${
                            navLink === "/admin/product/create" &&
                            "active bgyellow border border-warning "
                          } `}
                          aria-current="page"
                        >
                          Create
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <li className="nav-item mb-4">
                  <Link href="/dashboard">
                    <a
                      className={`nav-link ${
                        navLink === "/dashboard" &&
                        "active ps-2 rounded-bottom    border-start border-bottom "
                      } `}
                      aria-current="page"
                    >
                      Orders
                    </a>
                  </Link>
                </li>

                <li className="nav-item mb-4">
                  <Link href="/dashboard">
                    <a
                      className={`nav-link ${
                        navLink === "/dashboard" &&
                        "active ps-2 rounded-bottom    border-start border-bottom "
                      } `}
                      aria-current="page"
                    >
                      <StarOutlined /> Users
                    </a>
                  </Link>
                </li>

                <li className="nav-item mb-4">
                  <Link href="/dashboard">
                    <a
                      className={`nav-link ${
                        navLink === "/dashboard" &&
                        "active ps-2 rounded-bottom    border-start border-bottom "
                      } `}
                      aria-current="page"
                    >
                      Reviews
                    </a>
                  </Link>
                </li>
              </ul>

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default AdminNav;
