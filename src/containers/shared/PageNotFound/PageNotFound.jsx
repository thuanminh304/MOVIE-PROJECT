import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
  render() {
    return (
      <div>
        <h1>KHÔNG TÌM THẤY TRANG</h1>
        <br />
        <Link to="/">
          <button className='btn btn-info'>Trở về trang chủ</button>
        </Link>
      </div>
    );
  }
}
