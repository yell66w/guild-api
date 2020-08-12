import axios from "axios";

export const GuildAPI = axios.create({
  baseURL: "http://localhost:4000/",
});
