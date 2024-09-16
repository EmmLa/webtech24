import React from "react";
import "./style.css";
import logo from "./logo.png"; // Chemin vers votre logo

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo" />
    </footer>
  );
};

export default Footer;
