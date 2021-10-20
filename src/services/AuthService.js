import axios from "axios";
import jwtDecode from "jwt-decode";

const authUrl = "https://peaceful-peak-03211.herokuapp.com/auth"; //prod
///const authUrl = "http://localhost:3002/auth"; //dllo

export const loginAuth = async (credentials) => {
    return await axios.post(`${authUrl}/login`, credentials);
}

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}

export const authHeaders = {
    "auth-token":localStorage.getItem("token") 
}