import axios from "axios";

const BASE_URL = "https://rest.coincap.io/v3";
const API_KEY = import.meta.env.VITE_COINCAP_API_KEY;

class API {
    static get = (path) => {
        return axios.get(`${BASE_URL}${path}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });
    };
}

export default API;
