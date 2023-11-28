import axios from "axios";

export const initialize = () => {
    axios.defaults.baseURL = process.env.API_URL
}