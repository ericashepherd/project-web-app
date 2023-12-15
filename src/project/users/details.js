import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import * as favClient from "../favorites/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles.css";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const favorites = await favClient.findVideosThatUserFavorited(id);
      setFavorites(favorites);
    }
    catch (err){
      console.log(err);
    }
  };

  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
    fetchFavorites();
  }, [id]);

  return (
    <div>
      {console.log(id)}
      {console.log(user)}
      <br/>
      {(!currentUser || currentUser._id !== id) && (
        <div className="wd-gray">
          Viewing Profile
        </div>
      )}
      <div className="row">
        <div className="col-5 ms-3 me-2 wd-borders">
          <h2 className="wd-seagreen">User Details</h2>
          <hr className="wd-seagreen"/>
          <p>Username: {user.username}</p>
          {(currentUser._id === id ||
          currentUser.role==="ADMIN"||currentUser.role==="FACULTY"
          || currentUser.role==="STUDENT") &&
          (
            <p>Email: {user.email}</p>
          )}
          {(currentUser) && (<p>First Name: {user.firstName}</p>)}
          {(currentUser) && (<p>Last Name: {user.lastName}</p>)}
          {
          (currentUser.role==="ADMIN"||currentUser.role==="FACULTY")
          && 
          (<p>Role: {user.role}</p>)
          }
        </div>
        
      {((currentUser) && (
        <div className="col me-3 wd-borders">
          <h2 className="wd-seagreen">Favorited Video List</h2>
          <div className="list-group">
            {favorites && favorites.map((favorite) => (
              <Link
                key={favorite._id}
                to={`/details/${favorite.videoId}`}
                className="list-group-item"
              >
                {favorite.videoTitle}
              </Link>
            ))}
          </div>
        </div>
      ))}
      </div>

      <br/><hr className="wd-seagreen"/><br/>
    </div>
    
  );
}

export default UserDetails;