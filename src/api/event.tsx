import axios from "axios";
import { IPostevent } from "../interface/Ievent";

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
};
export const getEventById = async (eventId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/eventById/${eventId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getEventByRoomId = async (roomId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/eventByRoomId/${roomId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createEvent = async (event: IPostevent) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/createEvent`,
            event
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteEventById = async (eventId: string) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_EVENT}/deleteEvent/${eventId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
