import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import UserProfile from "./ProfilInfo";
import { useLocalStorage } from "react-use";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = UserProfile.getMail();
  // const { login } = useAuth(); // Utilisez le hook de contexte pour obtenir la méthode de connexion

  let { loginUser } = useContext(AuthContext);

  const [value, setValue] = useLocalStorage("key", "initial-value");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(username);
      console.log(password);
      const response = await axios.post("http://localhost:8000/api/login/", {
        username: username,
        password: password,
      });
      // Save the tokens in local storage or context
      console.log(response);

      // let { loginUser } = useContext(AuthContext);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user_id", response.data.user_id);
      window.localStorage.setItem("username", JSON.stringify(username));

      // Ajouter le header d'authentification pour les futures requêtes
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      console.log(username);
      UserProfile.setMail(username);
      console.log("test");
      console.log(UserProfile.getMail());
      setValue("new-value");
      // login(username);

      window.location.href = "/productList";
      // Redirect or update UI to reflect logged-in state
    } catch (error) {
      console.log(error);
      setError("Invalid credentials");
    }
  };

  if (window.localStorage.getItem("username")) {
    return (
      <div className="login-container">
        <h1>You are already logged in...</h1>
        <button onClick={() => (window.location.href = "/Home")}>
          Return to Home
        </button>
      </div>
    );
  } else {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }
};

export default Login;
