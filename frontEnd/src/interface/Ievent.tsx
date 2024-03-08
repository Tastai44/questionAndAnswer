export interface Ievent {
    title: string;
    ownerName: string;
}

export interface IQuestion {
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    timestamp: string;
    likeNumber: { userLikeId: string; }[];
}