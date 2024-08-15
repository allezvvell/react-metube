import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const apiYoutbe = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: API_KEY,
  },
});

export const apiYoutbeChannel = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    key: API_KEY,
  },
});
