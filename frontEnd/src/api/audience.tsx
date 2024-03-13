import axios from "axios";
import { Iuser } from "../interface/Iuser";

export const addUser = async (user: Iuser) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/addUser`,
            user
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};