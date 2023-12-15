import axios from "axios";
import { USERS_API } from "../constants/filepaths";

const request = axios.create({
  withCredentials: true,
});


export const login = async (user) => {
    const response = await request.post(`${USERS_API}/login`, user);
    return response.data;
};

export const profile = async () => {
  const response = await request.post(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const users = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await request.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};

export const register = async (user) => {
  const response = await request.post(`${USERS_API}/register`, user);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

export const findUsersByRole = async (role) => {
  const response = await request.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
