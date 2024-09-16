import React from "react";
import axios from "axios";

const Logout = () => {
  const handleLogout = async () => {
    console.log("bonjour");
    try {
      // Récupérer le token d'authentification avant de le supprimer
      const token = window.localStorage.getItem("access");

      // Vérification du token
      if (!token) {
        console.error("Token manquant ou invalide.");
        return;
      }
      // Configurer les en-têtes de la requête
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Affichage du token pour vérifier qu'il est correct
      console.log("Token envoyé dans la requête:", token);

      // Supprimer le header d'authentification pour la requête de déconnexion
      delete axios.defaults.headers.common["Authorization"];

      // Effectuer la requête de déconnexion
      const response = await axios.post(
        "http://localhost:8000/api/logout/",
        {}, // Corps de la requête peut être vide ou contenir des données selon votre API
        { headers }
      );

      if (response.status === 200) {
        // Supprimer les tokens d'authentification du stockage local
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("key");

        // Rediriger vers la page de connexion
        window.location.href = "/login";
      } else {
        console.error("Logout fail:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="logout-container">
      <h1>Déconnexion</h1>
      <button onClick={handleLogout} className="logout-button">
        Déconnexion
      </button>
    </div>
  );
};

export default Logout;
