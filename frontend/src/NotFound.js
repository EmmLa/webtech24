import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Oups, page not found !</h1>
      <p>La page que vous cherchez n'existe pas.</p>
      <Link to="/">
        <button>Retour à l'accueil</button>
      </Link>
    </div>
  );
};

export default NotFound;
