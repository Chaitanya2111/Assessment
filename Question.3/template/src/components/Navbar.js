import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CiSearch } from "react-icons/ci";
import logo from "../img/logo.png";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <img
        src={logo}
        alt="logo"
        className="rounded-circle"
        style={{ width: "100px", height: "60px" }}
      />
      <a className="navbar-brand text-white m-1" href="#">
        MATERIAL PRO
      </a>

      <CiSearch
        size={30}
        className="sidebar-icon"
        color="white"
        style={{ marginLeft: "30px" }}
      />

      <div className="collapse navbar-collapse d-flex justify-content-end ">
        <ul className="navbar-nav ml-auto m-1">
          <li className="nav-item ">
            <button className="btn btn-danger">Upgrade to Pro</button>
          </li>
          <li className="nav-item m-1">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Profile"
              className="rounded-circle"
              style={{ width: "30px", height: "30px" }}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
