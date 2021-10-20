import axios from "axios";

const usersUrl = "http://localhost:3002/usuarios";

export const createUser = async (user) => {
    return await axios.post(`${usersUrl}/`, user);
}