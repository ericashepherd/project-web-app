import axios from "axios";
import * as filepaths from "../constants/filepaths"

const request = axios.create({
    withCredentials: true,
});

export const addPlaylistVideo = async (playlistId, videoId) => {
    const response = await request.post(`${filepaths.VIDEOS_API}/${playlistId}/${videoId}`);
    return response.data;
};

export const findPlaylistVideos = async(playlistId) => {
    const response = await request.get(`${filepaths.VIDEOS_API}/${playlistId}`);
    return response.data;
};
