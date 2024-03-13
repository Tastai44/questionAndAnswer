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

export const getQuesById = async (questionId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/questionById/${questionId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getQuesByOwnerId = async (ownerId: string) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_EVENT}/getQuestionsByOwnerId/${ownerId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const saveQuestion = async (questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/saveQuestion/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const unSaveQuestion = async (questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/unSaveQuestion/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const readQuestion = async (questionId: string) => {
    try {
        return await axios.post(
            `${import.meta.env.VITE_EVENT}/readQuestion/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const deleteQuestionById = async (questionId: string) => {
    try {
        return await axios.delete(
            `${import.meta.env.VITE_EVENT}/deleteQuestionById/${questionId}`
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};

