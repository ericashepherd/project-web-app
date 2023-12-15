import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as userClient from "./client";
import * as client from "../client";
import * as filepaths from "../constants/filepaths";
import * as favClient from "../favorites/client";
import * as playlistClient from "../playlists/client";
import * as videoClient from "../videos/client";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";
import "./index.css";
import "../styles.css";
import { current } from "@reduxjs/toolkit";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const [videos, setVideos] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [playlistVids, setPlaylistVids] = useState([]);
  const [error, setError] = useState();
  const { currentUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // signs out client and returns to login screen
  const signout = async () => {
    try{
      await userClient.signout();
      dispatch(setCurrentUser(null));
      navigate(filepaths.LOGIN_PATH);
    }
    catch(error){
      console.log(error)
    }
  };

  // gets current profile if logged in, otherwise redirects to login
  const fetchProfile = async () => {
    try {
      setProfile(currentUser);
    } catch (err) {
      navigate(filepaths.LOGIN_PATH);
    }
  };

  const fetchFavorites = async () => {
    if (currentUser._id){
      try {
        const favorites = await favClient.findVideosThatUserFavorited(currentUser._id);
        setFavorites(favorites);
      }
      catch (err){
        setError(err);
      }
    }
  };

  const fetchPlaylists = async () => {
    if (currentUser._id){
      try {
        const playlists = await playlistClient.fetchPlaylistById(currentUser._id);
        setPlaylists(playlists);
      }
      catch (err){
        setError(err);
        console.log(err);
      }
    }
  };

  const fetchVideoTitle = async () => {
    if (currentUser._id && playlistVids){
      try{
        const videoInfo = await Promise.all(
          playlistVids.map(async (vid) => await client.findVideoById(vid.videoId)
            )
          )
        console.log(videoInfo);
        setVideos(videoInfo);
      }
      catch(err){
        setError(err);
      }
    }
  };

  const selectButton = async (playlistId) => {
    try {
      const playlistVids = await videoClient.findPlaylistVideos(playlistId);
      setPlaylistVids(playlistVids);
    }
    catch (err){
      setError(err);
      console.log(err);
    }
  }
  
  const save = async () => {
    await userClient.updateUser(profile);
    dispatch(setCurrentUser(profile));
  };

  useEffect(() => {
    fetchProfile();
    fetchFavorites();
    fetchPlaylists();
    fetchVideoTitle();
  }, [playlistVids]);

  if (currentUser) {
  return (
    <div>
      <br/>
      <div className="row">
        <div className="col-5 ms-3 me-2 wd-borders">
          <h1 className="wd-seagreen">Profile</h1>
          <hr className="wd-seagreen"/>
          {profile && (
            <div>
              <input
                value={profile.username}
                readOnly
                placeholder="username"
                className="form-control mb-2"
              />
              <input
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                value={profile.password}
                type="password"
                className="form-control mb-2"
              />
              <input
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
                value={profile.firstName}
                placeholder="First Name"
                className="form-control mb-2"
              />
              <input
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
                value={profile.lastName}
                placeholder="Last Name"
                className="form-control mb-2"
              />
              <input
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                value={profile.dob && profile.dob.substring(0, 10)}
                type="date"
                placeholder="Date of Birth"
                className="form-control mb-2"
              />
              <input
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                value={profile.email}
                type="email"
                placeholder="Email"
                className="form-control mb-2"
              />
              <select
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                value={profile.role}
                className="form-control mb-2"
              >
                <option value="USER">User</option>
                {currentUser.role==="ADMIN" && <option value="ADMIN">Admin</option>}
                {(currentUser.role==="FACULTY" || currentUser.role==="ADMIN") && <option value="FACULTY">Faculty</option>}
                <option value="STUDENT">Student</option>
              </select>
              <button onClick={save} className="btn btn-success w-100 mb-2">
                Save
              </button>
              <button onClick={signout} className="btn btn-warning w-100 mb-2">
                Signout
              </button>
              {profile.role === "ADMIN" && (
                <Link to="/admin/users" className="btn btn-secondary w-100">
                  Users
                </Link>
              )}
            </div>
          )}
        </div>
        
        <div className="col me-2">
          <div className="wd-borders">
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

      
          <hr className="wd-seagreen mt-4 mb-4"/>

          <div className="wd-borders">
            <h2 className="wd-seagreen">Playlists</h2>
            <select className="form-select" onChange={(e) => {selectButton(e.target.value);}}>
              <option selected disabled>Select a playlist</option>
              {playlists && playlists.map((playlist) => (
                <option value={playlist._id}>
                  {playlist.name}
                </option>
              ))}
            </select>

            <br/>
            <h5 className="wd-seagreen">Playlist Videos</h5>
            <div className="list-group">
              {videos && videos.map((vid, index) => (
    
                <Link
                  key={index}
                  to={`/details/${vid.id}`}
                  className="list-group-item"
                >
                  {vid.snippet.title};
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br/><hr className="wd-seagreen"/><br/>
    </div>
  );
  }
  else{
    return(navigate(filepaths.LOGIN_PATH));
  }
}

export default Profile;
