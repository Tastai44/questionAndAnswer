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

export const getUserByName = async (name: string) => {
    try {
        return await axios.get(
            `${import.meta.env.VITE_EVENT}/usersByName/${name}`
        ).then((res) => res.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUserById = async (userId: string) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_EVENT}/deleteUserById/${userId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};