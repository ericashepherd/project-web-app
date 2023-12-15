/*
 * constant variables for file paths
 */


export const HOME_PATH = "/home";
export const LOGIN_PATH = "/login";
export const PROFILE_PATH = "/profile";
export const PROFILE_ID_PATH = "/profile/:id";
export const REGISTER_PATH = "/register";
export const SEARCH_PATH = "/search";
export const SEARCH_ID_PATH = "/search/:search";
export const VID_DETAILS_PATH = "/details/:videoId";
export const ADMIN_PATH = "/admin/users";

export const BASE_API = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
export const USERS_API = `${BASE_API}/users`;
export const FAVORITES_API = `${BASE_API}/favorites`;
export const VIDEOS_API = `${BASE_API}/videos`;
export const PLAYLISTS_API = `${BASE_API}/playlists`;