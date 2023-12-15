import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import * as favClient from "./favorites/client";
import * as playlistClient from "./playlists/client";
import * as videoClient from "./videos/client";
import { useSelector } from "react-redux";
import "./styles.css";

function Details() {
  const { videoId } = useParams();
  const { currentUser } = useSelector((state) => state.userReducer);
  const [video, setVideo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [userFavorited, setUserFavorited] = useState(null);
  const [buttonText, setButtonText] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [newPlaylist, setNewPlaylist] = useState("");

  const fetchVideoInfo = async () => {
    try{
      const videoInfo = await client.findVideoById(videoId);
      setVideo(videoInfo);
    }
    catch(err){
      setError(err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const _favorites = await favClient.findUsersThatFavoritedVid(videoId);
      setFavorites(_favorites);
    }
    catch (err){
      setError(err);
    }
  };

  const fetchUserFavorited = async () => {
    if (currentUser){
      try {
        const userFavorited = await favClient.findIfUserFavorited(currentUser._id, videoId);
        setUserFavorited(userFavorited);
        if (userFavorited.length>0){
          setButtonText("Unfavorite");
        } else {
          setButtonText("Favorite");
        }
      }
      catch (err){
        setError(err);
      }
    }
  }

  const currentUserFavoritesVideo = async () => {
    const _favorites = await favClient.createUserFavoritesVid(
      currentUser._id,
      videoId,
      video.snippet.title
    );
    setFavorites([_favorites, ...favorites]);
    fetchFavorites();
  };

  const deleteUserFavoritesVid = async () => {
    try {
      await favClient.deleteUserFavoritesVid(
        currentUser._id,
        videoId
      );
      setFavorites(favorites.filter((u) => u.user._id !== currentUser._id));
    }
    catch (err) {
      setError(err);
    }
  };

  const buttonFavoriteClick = () => {
    if ((buttonText.localeCompare("Favorite")===0) || userFavorited.length===0){
      setButtonText("Unfavorite");
      currentUserFavoritesVideo();
    } else {
      setButtonText("Favorite");
      deleteUserFavoritesVid();
    }
  }

  const fetchPlaylists = async () => {
    if (currentUser){
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

  const selectButton = async (playlistId) => {
    try {
      if (playlistId==="false"){
        const _playlist = await playlistClient.createPlaylist(currentUser._id, newPlaylist);
        const status = await videoClient.addPlaylistVideo(_playlist._id, videoId);
        fetchPlaylists();
      }
      else {
        const status = await videoClient.addPlaylistVideo(playlistId, videoId);
      }
      setSuccess("Video added");
    }
    catch (err){
      setError(err);
      console.log(err);
      setSuccess("Error");
    }
  }

  useEffect(() => {
    fetchVideoInfo();
    fetchFavorites();
    fetchUserFavorited();
    fetchPlaylists();
  }, [buttonText]);

  return (
    <div>
      {video && (
        <div className="container mt-3">
          {currentUser && (
            <div className="row row-cols-auto justify-content-end">
              <div className="col align-self-start">
                {success && <div className="alert alert-success py-2">{success}</div>}
              </div>
              <div className="col px-1"> 
                <input
                  onChange={(e) =>
                    setNewPlaylist(e.target.value)
                  }
                  value={newPlaylist}
                  type="newPlaylist"
                  placeholder={"Enter the name of your new playlist here"}
                  className="form-control"
                />
              </div>

              <div className="col px-1"> 
                <select className="form-select" onChange={(e) => {selectButton(e.target.value);}}>
                  <option selected disabled>Add to playlist</option>
                  {playlists && playlists.map((playlist) => (
                    <option value={playlist._id}>
                      {playlist.name}
                    </option>
                  ))}
                  <option value={false}>
                    Add to new playlist
                  </option>
                </select>
              </div>

              <div className="col ps-1">
                <button
                  onClick={buttonFavoriteClick}
                  className="btn btn-warning mb-2"
                >
                  {buttonText}
                </button>
              </div>


            </div>
          )}
          <Link to={`https://www.youtube.com/watch?v=${videoId}`}>
          <div className="wd-vid-container px-0">
            <img
              src={video.snippet.thumbnails.standard.url}
              alt={video.snippet.title}
              className="wd-vid-image "
            />
            <div className="wd-vid-overlay">
              <div className="wd-play-button" />
            </div>
          </div>           
          </Link>
          <h1 className="mt-3">{video.snippet.title}</h1>
          <hr/>
          <h5 className="wd-gray">{video.snippet.description}</h5>
          <br/>
        
          <div className="wd-borders wd-yellow">
            <h2>Favorited by:</h2>
            <ul className="list-group">
              {favorites && favorites.length>0 && favorites.map((favorite, index) => (
                <li key={index} className="list-group-item wd-links">
                  {favorite.user.firstName} {favorite.user.lastName} 
                  <Link
                    className="ps-1"
                    to={`/profile/${favorite.user._id}`}>
                    @{favorite.user.username}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <br/>

        </div>
      )}
    </div>
  );
}

export default Details;
