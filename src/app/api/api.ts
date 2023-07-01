import axios from "axios";
import { MovieFromBackend } from "./types";

const API_URL = "https://api.movie-app.nomoredomains.rocks";

export const fetchUserData = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signin`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const updateUser = async (
  token: string,
  name: string,
  email: string
) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.patch(
    `${API_URL}/users/me`,
    {
      name,
      email,
    },
    { headers }
  );
  return response.data;
};

export const createMovie = async (
  token: string,
  movieData: MovieFromBackend
) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.post(`${API_URL}/movies`, movieData, {
    headers,
  });
  return response.data;
};

export const getUserMovies = async (token: string) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API_URL}/movies`, { headers });
  return response.data;
};

export const removeMovie = async (token: string, movieId: number) => {
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.delete(`${API_URL}/movies`, {
    data: { movieId },
    headers,
  });
  return response.data;
};
