import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post("/api/products", formData)
      .then((response) => {
        console.log(response.data);
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="add-product-page">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Name :</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price :</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image :</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit" className="add-product-button">
          Add Product
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
