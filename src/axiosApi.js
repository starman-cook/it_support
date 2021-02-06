import axios from "axios";
import {apiUrl} from "./constants/apiUrl";

const instance = axios.create({
    baseURL: apiUrl
});

export default instance;