export interface IAddQuestion {
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    timestamp: Date;
}

export interface IEditQuestion {
    questionText: string;
    timestamp: Date;
}

export interface IComment {
    commentId: string;
    ownerId: string;
    name: string;
    context: string;
    timestamp: Date;
}

export interface IAddComment {
    ownerId: string;
    name: string;
    context: string;
    timestamp: Date;
}
