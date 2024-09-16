import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserProfile from "./ProfilInfo";

const ProductList = () => {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/") // Assurez-vous que l'URL correspond à votre point de terminaison API
      .then((res) => {
        const data = res.data;
        setDetails(data);
      })
      .catch((err) => {
        console.error(err); // Ajoutez une gestion des erreurs
      });
  }, []);

  const handleProductClick = (id) => {
    var mylink = `/PageProduct/${id}`;
    navigate(mylink);
  };

  return (
    <div className="-page">
      <div className="products-container">
        {details.map((output, index) => (
          <div key={index} className="product-container">
            <h2>{output.name}</h2>
            <img src={output.photo} alt={output.name} />
            <p>Prix : {output.price} €</p>
            <button
              onClick={() => {
                if (output.id) {
                  handleProductClick(output.id);
                } else {
                  console.error("No ID found for product:", output);
                }
              }}
            >
              Details
            </button>
          </div>
        ))}
      </div>
      <div>
        <h1>{UserProfile.getMail()}</h1>
      </div>
    </div>
  );
};

export default ProductList;
