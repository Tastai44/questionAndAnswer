import { IComment } from "./IQuestion";

export interface Ievent {
    eventId: string;
    temRoomId: string;
    title: string;
    ownerName: string;
}

export interface IQuestion {
    questionId: string;
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    isRead: boolean;
    isSave: boolean;
    isEdit: boolean;
    timestamp: string;
    likeNumber: { userLikeId: string }[];
    comment: IComment[];
}
