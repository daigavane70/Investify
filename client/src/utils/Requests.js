import axios from "axios";

const backend = axios.create({
  // baseURL: `https://xenia-mcq-22.herokuapp.com/api`,
  baseURL: `http://localhost:4000/api`,
});

export const login = (data) => {
  return backend.post("/auth/login", data);
};

export const getUserByToken = (token) => {
  return backend.get("/auth/profile", {
    headers: { authorization: "Bearer " + token },
  });
};

export const getAllStartups = () => {
  return backend.get("/startup/");
};

export const getAllAsks = () => {
  return backend.get("/ask/");
};

export const getStartupById = (id) => {
  return backend.get("/startup/" + id);
};

export const addBid = (data) => {
  return backend.put("/ask/bid", data);
};
