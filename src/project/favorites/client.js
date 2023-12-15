import axios from "axios";

import * as filepaths from "../constants/filepaths";

export const findAllLikes = async () => {};

export const createUserFavoritesVid = async (userId, videoId, videoTitle) => {
  const response = await axios.post(`${filepaths.USERS_API}/${userId}/favorites/${videoId}/${videoTitle}`);
  return response.data;
};

export const deleteUserFavoritesVid = async (userId, videoId) => {
    const response = await axios.delete(`${filepaths.USERS_API}/${userId}/favorites/${videoId}`);
    return response.data;
};

export const findUsersThatFavoritedVid = async (videoId) => {
  const response = await axios.get(`${filepaths.FAVORITES_API}/${videoId}/users`);
  return response.data;
};

export const findVideosThatUserFavorited = async (userId) => {
  const response = await axios.get(`${filepaths.USERS_API}/${userId}/favorites`);
  return response.data;
};

export const findIfUserFavorited = async (userId, videoId) => {
  const response = await axios.get(`${filepaths.USERS_API}/${userId}/favorites/${videoId}`)
  return response.data;
}
