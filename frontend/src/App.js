import axios from "axios";
import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import NotFound from "./NotFound";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import MyCart from "./MyCart";
import CreateProductPage from "./ProductCreation";
import AddProduct from "./AddProduct";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductPage from "./ProductPage";
import ProductList from "./ProductList";
import MyProfile from "./MyProfile"; // Importer le nouveau composant
import React, { useState, useEffect } from "react";
import { AuthProvider } from "././context/AuthContext";
import PopulateDBButton from "./PopulateDB";

axios.defaults.xsrfCookieName = "csrtoken";
axios.defaults.xsrfHeaderName = "X-CSRFtoken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

class App extends Component {
  state = { details: [] };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/") // Assurez-vous que l'URL correspond à votre point de terminaison API
      .then((res) => {
        const data = res.data;
        this.setState({ details: data });
      })
      .catch((err) => {
        console.error(err); // Ajoutez une gestion des erreurs
      });
  }

  render() {
    return (
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Mycart" element={<MyCart />} />
            <Route path="/PageProduct/:productId" element={<ProductPage />} />
            <Route path="/ProductList" element={<ProductList />} />
            <Route path="/AddProduct" element={<CreateProductPage />} />
            <Route path="/Profile/:id" element={<MyProfile />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/populate-db" element={<PopulateDBButton />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    );
  }
}

export default App;
