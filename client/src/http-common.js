import axios from "axios";
import Cookies from "js-cookie";

/**
 * Create a pre-configured Axios instance with base URL and headers
 */
export default axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        "Content-type": "application/json",
        "X-XSRF-TOKEN": Cookies.get('XSRF-TOKEN')
    }
});