import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./style.css"; // Ensure you import your CSS file
import AuthContext from "./context/AuthContext"; // Import the context

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <div className="home-page">
      <div className="home-logo">
        <img src={logo} alt="Company Logo" className="home-logo" />
      </div>
      <div className="home-right">
        <div>
          <h1>Home</h1>
        </div>
        {username ? (
          <div>
            <button onClick={() => navigate("/Logout")} className="home-button">
              Logout
            </button>
            <button
              onClick={() => navigate("/AddProduct")}
              className="home-button"
            >
              Add Product
            </button>
          </div>
        ) : (
          <button onClick={() => navigate("/Login")} className="home-button">
            Login
          </button>
        )}
        <p>
          You don't have an account?{" "}
          <Link to="/Register" className="register-link">
            Register
          </Link>
        </p>
        <button
          onClick={() => navigate("/ProductList")}
          className="home-button"
        >
          Shopping
        </button>
        <button
          onClick={() => navigate("/populate-db")}
          className="home-button"
        >
          PopulateDB
        </button>
      </div>
    </div>
  );
};

export default Home;
