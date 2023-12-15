import axios from "axios";
export const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
export const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
export const CHANNEL_ID = "UCgCALeun810khVFtOKHfDbw"

export const findVideos = async (searchTerm) => {
  const response = await axios.get(
    `${YOUTUBE_API}/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&type=video&q=${searchTerm}&key=${API_KEY}`
  );
  console.log(response);
  return response.data.items;
};

export const findVideoById = async (videoId) => {
  const response = await axios.get(
    `${YOUTUBE_API}/videos?part=snippet&id=${videoId}&key=${API_KEY}`
  );
  return response.data.items[0];
};