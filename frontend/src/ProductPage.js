import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css"; // Importer le fichier CSS

const ProductPage = () => {
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [email, getUserEmail] = useState(null);
  const [userid, setUserId] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setUserId(user_id);
    }
  }, []);

  const handleClick = (event) => {
    setError("");
    console.log(productId, userid);
    try {
      // Remplacez l'URL par celle de votre endpoint d'inscription
      axios.post(`http://127.0.0.1:8000/cart/`, {
        userid,
        productId,
      });

      // Redirection ou message de succès
      alert("Added to cart !");
      window.location.href = "/productList";
    } catch (err) {
      setError("Fail during Creation. Please try again in a moment.");
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/${productId}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);

  if (!product) {
    return <div className="not-found">Loading...</div>;
  }

  return (
    <div className="product-page">
      <h2 className="product-name">{product.name}</h2>
      <div className="product-content">
        <div className="product-details">
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
      {username ? (
        <button onClick={handleClick} className="add-to-cart">
          Add to Cart
        </button>
      ) : (
        <p>Please log in to add items to your cart.</p>
      )}
    </div>
  );
};

export default ProductPage;
