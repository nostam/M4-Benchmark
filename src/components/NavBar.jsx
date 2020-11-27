import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png";
class NavBar extends Component {
  render() {
    return (
      <aside>
        <div>
          <img src={logo} alt="logo" class="logo" />
        </div>
        <div class="menu d-flex column justify-content-start align-items-center">
          <div class="col input-group-prepend">
            <input
              id="searchInput"
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button id="searchBtn" class="btn btn-outline-success btn-sm">
              {/* <i class="fas fa-search search-button"></i> */}
              Search
            </button>
          </div>
        </div>
        <div class="menu d-flex column justify-content-start align-items-center">
          <div class="col">
            {/* <i class="fas fa-home fa-lg"></i> */}
            Home
          </div>
        </div>
        <div class="menu d-flex column justify-content-start align-items-center">
          <div class="col">
            {/* <i class="fas fa-book fa-lg"></i> */}
            Your library
          </div>
        </div>
        <div class="menu d-flex column justify-content-start align-items-center">
          <div class="col">
            {/* <i class="fas fa-plus-circle fa-lg"></i> */}
            Create playlist
          </div>
        </div>
        <div class="menu d-flex column justify-content-start align-items-center">
          <div class="col">
            <a href="#">
              {/* <i class="far fa-heart fa-lg"></i>Liked Songs */}
            </a>
          </div>
        </div>
        <hr />
        <div class="playlists"></div>
        <div class="stick-to-bottom-index-page">
          <div class="login-button-index">
            <a href="login.html">
              <span>SIGN UP</span>
            </a>
          </div>
          <div class="login-button-index">
            <a href="login.html">
              <span>LOGIN</span>
            </a>
          </div>
          <div class="install-btn">
            <a href="#">
              <i class="fas fa-arrow-circle-down fa-lg"></i> Install
            </a>
          </div>
        </div>
      </aside>
    );
  }
}
export default withRouter(NavBar);
