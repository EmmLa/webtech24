import React from "react";
import axios from "axios";

const PopulateDBButton = () => {
  const handleClick = () => {
    axios
      .get("http://127.0.0.1:8000/populate-db/")
      .then((response) => {
        alert(response.data.message); // Show success message
        window.location.href = "/Home";
      })

      .catch((error) => {
        alert(
          "Failed to populate database: " + error.response?.data?.error ||
            error.message
        ); // Show error message
      });
  };

  return <button onClick={handleClick}>Populate Database</button>;
};

export default PopulateDBButton;
