import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { generalContext } from "../context";
import { RemoveUser } from "../context/UserConstant";
import axios from "axios";

import { Dropdown, Badge, Menu, Space, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const TopNav = () => {
  const route = useRouter();
  const {
    state: { user, cartItems },
    dispatch,
  } = useContext(generalContext);

  const [navLink, setNavLink] = useState("");
  const [cartQty, setcartQty] = useState("");

  const handleLogout = async (e) => {
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
      setcartQty(cartItems.reduce((i, c) => i + Number(c.quantity), 0));
    },
    [cartItems]
  );

  useEffect(
    (e) => {
      process.browser && setNavLink(window.location.pathname);
    },
    [process.browser && window.location.pathname]
  );
  return (
    <div style={{ fontSize: "20px" }}>
      <>
        <nav className="navbar navbar-expand-lg  navbar navbar-dark bg-dark">
          <div className="container-fluid px-3">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              {/* <a className="navbar-brand" href="#"></a> */}

              <Link href="/">
                <a className="navbar-brand" aria-current="page">
                  Hedo Shop
                </a>
              </Link>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link href="/">
                    <a
                      className={`nav-link ${
                        navLink === "/" &&
                        "active    border-bottom border-warning"
                      } `}
                      aria-current="page"
                    >
                      Home{" "}
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      navLink === "/disable" &&
                      "active   border-bottom border-warning"
                    } disabled`}
                    href="#"
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    {/* Disabled */}
                  </a>
                </li>
              </ul>

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              <form hidden className="d-flex">
                <input
                  hidden
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  hidden
                  className="btn btn-outline-success"
                  type="submit"
                >
                  Search
                </button>
              </form>

              {/*  */}
              {/*  */}
              {/*  */}
              {/*  */}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-itemp">
                  <Link href="/cart">
                    <a
                      className={`nav-link ${
                        navLink === "/cart" &&
                        "active   border-bottom border-warning"
                      } `}
                      aria-current="page"
                    >
                      Cart{" "}
                      <Badge count={cartQty} title="prompt text">
                        <ShoppingCartOutlined className=" h3 text-white" />
                        {/* {cartQty} */}
                      </Badge>
                    </a>
                  </Link>
                </li>
                {!user && (
                  <li className="nav-item">
                    <Link href="/login">
                      <a
                        className={`nav-link ${
                          navLink === "/login" &&
                          "active   border-bottom border-warning"
                        } `}
                        aria-current="page"
                      >
                        Login
                      </a>
                    </Link>
                  </li>
                )}
                {!user && (
                  <li className="nav-item">
                    <Link href="/register">
                      <a
                        className={`nav-link ${
                          navLink === "/register" &&
                          "active border-bottom border-warning"
                        } `}
                        aria-current="page"
                      >
                        Register
                      </a>
                    </Link>
                  </li>
                )}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                {user && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <Avatar
                        src={user && user.image && user.image[0].url}
                        size={45}
                      />{" "}
                      {user.name.toUpperCase()}
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link href="/user/me">
                          <a
                            className={`nav-link text-black h6 dropdown-item ${
                              navLink === "/user/me" &&
                              "active  border-bottom border-warning "
                              // "active bgyellow border border-warning border-bottom border-warning "
                            } `}
                            aria-current="page"
                          >
                            My Profile
                          </a>
                        </Link>
                      </li>

                      {user && user.role.includes("Admin") && (
                        <li className="nav-item">
                          <Link href="/admin/dashboard">
                            <a
                              className={`nav-link text-black h6 dropdown-item ${
                                navLink === "/admin/dashboard" &&
                                "active  border-bottom border-warning"
                              } `}
                              aria-current="page"
                            >
                              Dashboard
                            </a>
                          </Link>
                        </li>
                      )}

                      <li className="nav-item">
                        <Link href="/user/order">
                          <a
                            className={`nav-link text-black h6 dropdown-item ${
                              navLink === "/user/order" &&
                              "active  border-bottom border-warning"
                            } `}
                            aria-current="page"
                          >
                            Order
                          </a>
                        </Link>
                      </li>

                      <li className="nav-item">
                        <span
                          onClick={handleLogout}
                          className={`nav-link text-black h6 dropdown-item`}
                          aria-current="page"
                        >
                          Logout
                        </span>
                      </li>
                      {/* <li></li> */}
                      <li>
                        <a className="dropdown-item" href="#">
                          A third link
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default TopNav;
