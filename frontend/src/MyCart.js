import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DisplayCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const token = window.localStorage.getItem("access"); // Get the token from localStorage

  // Fetch user ID from localStorage
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      setUserId(user_id);
    } else {
      console.error("No user ID found in localStorage");
    }
  }, []);

  // Fetch cart items when userId is available
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://127.0.0.1:8000/cart?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add your token here
          },
        })
        .then((res) => {
          const data = res.data;
          setCart(data);
        })
        .catch((err) => {
          console.error(err); // Add error handling
        });
    }
  }, [userId, token]); // Include token in dependencies if it can change

  const handleProductClick = (id) => {
    const mylink = `/PageProduct/${id}`;
    navigate(mylink);
  };

  const handleRemoveFromCart = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add your token here
        },
      })
      .then((res) => {
        console.log(res.data);
        setCart(cart.filter((product) => product.id !== id));
      })
      .catch((err) => {
        console.error(err); // Add error handling
      });
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        {cart.length > 0 ? (
          cart.map((output, index) => (
            <div key={index} className="cart-product-container">
              <h2>{output.item.name}</h2>
              <img src={output.item.photo} alt={output.item.name} />
              <p>Price: {output.item.price} €</p>
              <button
                onClick={() => {
                  if (output.item.id) {
                    handleProductClick(output.item.id);
                  } else {
                    console.error("No ID found for product:", output);
                  }
                }}
              >
                Details
              </button>
              <button
                onClick={() => {
                  if (output.item.id) {
                    handleRemoveFromCart(output.item.id);
                  } else {
                    console.error("No ID found for product:", output);
                  }
                }}
              >
                Delete from Cart
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default DisplayCart;
