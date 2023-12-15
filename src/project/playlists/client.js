import axios from "axios";
import { PLAYLISTS_API } from "../constants/filepaths";

const request = axios.create({
  withCredentials: true,
});

export const createPlaylist = async (userId, name) => {
    const response = await request.post(`${PLAYLISTS_API}/${userId}/${name}`);
    return response.data;
}

export const fetchPlaylistById = async (userId) => {
    const response = await request.get(`${PLAYLISTS_API}/${userId}`);
    return response.data;
}