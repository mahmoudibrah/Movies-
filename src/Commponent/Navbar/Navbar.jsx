import React from "react";
import { NavLink } from "react-router-dom";
import LogoProject from "../../Assets/logo-dark.webp";
export default function Navbar({ usedata , logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-transparent navbar-dark align-items-center shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"home"}>
            <img src={LogoProject} alt="logo" className="w-100" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {usedata ? (
              <>
                <ul className="navbar-nav me-auto my-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"home"}>
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"Toprated"}>
                    Top Rated
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"popular"}>
                    popular
                    </NavLink>
                  </li>
                </ul>{" "}
              </>
            ) : (
              <></>
            )}

            <ul className="navbar-nav ms-auto my-2 mb-lg-0">
              {usedata ? (
                <>
                  {" "}
                  <li className="nav-item d-flex align-items-center mx-lg-2 gap-3 order-1 order-lg-first">
                    <i className="fa-brands fa-facebook facebook"></i>
                    <i className="fa-brands fa-twitter twitter"></i>
                    <i className="fa-brands fa-instagram instagram"></i>
                    <i className="fa-brands fa-spotify spotify"></i>
                  </li>{" "}
                  <li className="nav-item">
                    <span className="nav-link" onClick={logOut}>Logout</span>
                  </li>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"register"}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"login"}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
