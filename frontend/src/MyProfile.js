import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams(); // Supposons que l'ID de l'utilisateur soit passé en paramètre d'URL
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/custommodels/${id}/`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    navigate(`/editprofile/${id}`); // Naviguer vers une page d'édition (à implémenter)
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-details">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Last Name:</strong> {profile.last_name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
      </div>
      <button className="edit-button" onClick={handleEdit}>
        Edit
      </button>
    </div>
  );
};

export default MyProfile;
