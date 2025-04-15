import axios from "axios";

const API_URL = "https://prod-team-22-t62v97db.REDACTED/api/v1";

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
