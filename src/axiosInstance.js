import axios from "axios";

const authToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaW4zdkU3S1J5UGtmbVlxcVEiLCJleHAiOjE3Mzg2ODc0MjV9.fUrLsqXqdT1j760OSuyE74TGWSrazdLN9jwpn3u_Ez4";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Auth-Key": authToken,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
