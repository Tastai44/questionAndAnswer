import axios from "axios";

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
};

export const getQuesByEId = async (eventId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/questionByEId/${eventId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};