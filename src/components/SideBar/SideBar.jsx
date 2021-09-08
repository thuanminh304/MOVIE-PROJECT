import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link className="navbar-brand" to="#">
          TRANG QUẢN LÝ
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                AdminHome 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/qlnd">
                Quản lý người dùng
              </Link>
            </li>
            
          </ul>
         
        </div>
      </nav>
    </div>
  );
}
