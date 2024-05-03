import axios from "axios";
import authHeader from "./auth-header";

const getAllEvents = () => {
    return axios.get("/event", { headers: authHeader() });
  };

