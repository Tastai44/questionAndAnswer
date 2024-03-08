import axios from "axios";
import { Ievent } from "../interface/Ievent";

export const getQuestions = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/questions`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getEvent = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/events`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const createEvent = async (event: Ievent) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_EVENT}/createEvent`,
            event 
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}