import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function Header(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            {props.heading}
          </Link>
        </Navbar.Brand>
        <Nav>
          <Link to="/todos-list/add" className="nav-link">
            Add Todo
          </Link>
        </Nav>
      </Navbar>
      <br />
    </>
  );
}

Header.defaultProp = {
  heading: "Default heading goes here",
};

Header.propType = {
  heading: propTypes.string,
};
