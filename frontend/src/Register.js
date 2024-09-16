import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css"; // Assurez-vous d'ajouter les styles appropriés

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Remplacez l'URL par celle de votre endpoint d'inscription
      await axios.post("http://127.0.0.1:8000/register/", {
        name,
        last_name,
        email,
        username,
        password,
        password2,
      });
      // Redirection ou message de succès
      alert("Registration Done !");
      window.location.href = "/productList";
    } catch (err) {
      setError("Fail during registration. Please try again in a moment.");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Registration</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Verify Password</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">LastName</label>
          <input
            type="last_name"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      <div className="link-container">
        <p>
          Already Register ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
