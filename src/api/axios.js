import axios from "axios";

export const initialize = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
}