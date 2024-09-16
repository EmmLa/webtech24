import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css"; // Assurez-vous d'ajouter les styles appropriés

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("brand", brand);

    try {
      // Remplacez l'URL par celle de votre endpoint d'inscription
      await axios.post("http://127.0.0.1:8000/productsCreation/", {
        name,
        description,
        price,
        category,
        image,
        brand,
      });
      // Redirection ou message de succès
      alert("Creation Done !");
      window.location.href = "/productList";
    } catch (err) {
      setError("Fail during Creation. Please try again in a moment.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="CAM">Camera</option>
            <option value="POL">Polaroid</option>
            <option value="MIC">Microphone</option>
            <option value="ACC">Accesories</option>
          </select>
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <label>
          Brand:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
