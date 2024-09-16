import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "./logo.png"; // Chemin vers votre logo
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import UserProfile from "./ProfilInfo";
import { useLocalStorage } from "react-use";

const Header = () => {
  const location = useLocation();
  console.log("Header1");
  //let { user } = useContext(AuthContext);
  //console.log(user);
  var username = window.localStorage.getItem("username");
  console.log(username);

  return (
    <header className="header">
      <img src={logo} alt="Company Logo" className="headerlogo" />
      <div className="header-item">
        <h1>The Perfect Click'</h1>
      </div>
      <nav className="header-item">
        <Link to="/Home">Home</Link>
        <Link to="/MyCart">MyCart</Link>

        {window.localStorage.getItem("username") !== null ? (
          <>
            <Link to="/Logout">Logout</Link>
            <Link to="/AddProduct">Add Product</Link>
          </>
        ) : (
          <Link to="/Login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
