export interface IAddQuestion {
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    timestamp: string;
}

export interface IEditQuestion {
    questionText: string;
    timestamp: string;
}

export interface IComment {
    ownerId: string;
    name: string;
    context: string;
    timestamp: string;
}
