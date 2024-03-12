export interface User {
    id: string;
    name: string;
}

export interface Event {
    id: string;
    title: string;
    ownerName: string;
}

export interface Question {
    id: string;
    questionText: string;
    ownerId: string;
    name: string;
    eventId: string;
    timestamp: string;
    isRead: boolean;
    isSave: boolean;
    likeNumber: { userLikeId: string; }[];
}

function generateId(): string {
    const timestamp: number = new Date().getTime();
    const random: number = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}

/**
 * Open KV.
 */

const kv = await Deno.openKv();

export async function upsertUser(user: User) {
    const userKey = ["user", user.id];

    const oldUser = await kv.get<User>(userKey);
    const ok = await kv.atomic()
        .check(oldUser)
        .set(userKey, user)
        .commit();
    if (!ok) throw new Error("Something went wrong.");
}

export async function insertUser(user: User) {
    const userId = generateId();
    const userObject: User = { userId, ...user } as User;
    const userKey = ["user", userId];

    const ok = await kv.atomic()
        .set(userKey, userObject)
        .commit();

    if (!ok) throw new Error("Something went wrong.");
    return userId;
}

export async function insertQuestion(question: Question) {
    const questionId = generateId();

    if (question.likeNumber === undefined) {
        question.likeNumber = [];
        question.isRead = false;
        question.isSave = false;
    }

    const questionObject: Question = { questionId, ...question } as Question;
    const questionKey = ["question", questionId];

    const ok = await kv.atomic()
        .set(questionKey, questionObject)
        .commit();

    if (!ok) throw new Error("Something went wrong.");
    return 200;
}

export async function insertEvent(event: Event) {
    const eventId = generateId();
    const eventObject: Event = { eventId, ...event } as Event;
    const eventKey = ["event", eventId];

    const ok = await kv.atomic()
        .set(eventKey, eventObject)
        .commit();

    if (!ok) throw new Error("Something went wrong.");
    return eventId;
}

// Update
export async function updateEvent(eventId: string, updateEvent: Event) {
    const questionKey = ["event", eventId];

    // Retrieve the current question object
    const currentEventObject = (await kv.get(questionKey)).value as Event;

    if (!currentEventObject) {
        throw new Error("Event not found");
    }

    // Merge updated properties with the current question object
    const newEventObject: Event = {
        ...currentEventObject,
        ...updateEvent,
        id: currentEventObject.id
    };

    // Update the question object in the database
    const ok = await kv.atomic()
        .set(questionKey, newEventObject)
        .commit();

    if (!ok) {
        throw new Error("Failed to update question");
    }

    return 200;
}

export async function updateQuestion(questionId: string, updatedQuestion: Question) {
    const questionKey = ["question", questionId];

    // Retrieve the current question object
    const currentQuestionObject = (await kv.get(questionKey)).value as Question;

    if (!currentQuestionObject) {
        throw new Error("Question not found");
    }

    // Merge updated properties with the current question object
    const newQuestionObject: Question = {
        ...currentQuestionObject,
        ...updatedQuestion,
        id: currentQuestionObject.id
    };

    // Update the question object in the database
    const ok = await kv.atomic()
        .set(questionKey, newQuestionObject)
        .commit();

    if (!ok) {
        throw new Error("Failed to update question");
    }

    return 200;
}

/**
 * Get all.
 * @returns <User>
 */

export async function getAllUsers() {
    const users = [];
    for await (const res of kv.list({ prefix: ["user"] })) {
        users.push(res.value);
    }
    return users;
}

export async function getAllEvent() {
    const event = [];
    for await (const res of kv.list({ prefix: ["event"] })) {
        event.push(res.value);
    }
    return event;
}

export async function getAllQuestion() {
    const question = [];
    for await (const res of kv.list({ prefix: ["question"] })) {
        question.push(res.value);
    }
    return question;
}
export async function getQuestionsByEventId(eventId: string) {
    const questions: Question[] = [];
    for await (const res of kv.list({ prefix: ["question"] })) {
        const question = res.value as Question;
        if (question.eventId === eventId) {
            questions.push(question);
        }
    }
    return questions;
}
export async function getQuestionsByOwnerId(ownerId: string) {
    const questions: Question[] = [];
    for await (const res of kv.list({ prefix: ["question"] })) {
        const question = res.value as Question;
        if (question.ownerId === ownerId) {
            questions.push(question);
        }
    }
    return questions;
}
/**
 * Get by id.
 * @param id
 * @returns
 */

export async function getUserById(id: string): Promise<User> {
    const key = ["user", id];
    return (await kv.get(key)).value as User;
}
export async function getUserByName(name: string): Promise<User> {
    const key = ["user_by_name", name];
    return (await kv.get(key)).value as User;
}

export async function getEventById(id: string): Promise<Event> {
    const key = ["event", id];
    return (await kv.get(key)).value as Event;
}

export async function getUserByEmail(email: string) {
    const userByEmailKey = ["user_by_email", email];
    const id = (await kv.get(userByEmailKey)).value as string;
    const userKey = ["user", id];
    return (await kv.get(userKey)).value as User;
}
export async function getQuestionById(id: string): Promise<Question> {
    const key = ["question", id];
    return (await kv.get(key)).value as Question;
}

/**
 * Delete by id.
 * @param id
 */

export async function deleteUserById(id: string) {
    const userKey = ["user", id];
    const userRes = await kv.get(userKey);
    if (!userRes.value) return;
    await kv.atomic()
        .check(userRes)
        .delete(userKey)
        .commit();
}
export async function deleteEventById(id: string) {
    const eventKey = ["event", id];
    const eventRes = await kv.get(eventKey);
    if (!eventRes.value) return;
    await kv.atomic()
        .check(eventRes)
        .delete(eventKey)
        .commit();
}
export async function deleteQuestionById(id: string) {
    const questionKey = ["question", id];
    const questionRes = await kv.get(questionKey);
    if (!questionRes.value) return;
    await kv.atomic()
        .check(questionRes)
        .delete(questionKey)
        .commit();
}
export async function deleteQuestionByOwner(id: string, ownerId: string) {
    const questionKey = ["question", id];
    const questionRes = await kv.get(questionKey);
    if (!questionRes.value) return; // Question not found

    const question: Question = questionRes.value;
    if (question.ownerId !== ownerId) {
        throw new Error("You are not authorized to delete this question."); // Unauthorized to delete
    }

    await kv.atomic()
        .check(questionRes)
        .delete(questionKey)
        .commit();
}

export async function deleteAllUsers() {
    for await (const res of kv.list({ prefix: ["user"] })) {
        await kv.delete(res.key);
    }
}

export async function deleteAllQuestion() {
    for await (const res of kv.list({ prefix: ["question"] })) {
        await kv.delete(res.key);
    }
}

export async function deleteAllEvent() {
    for await (const res of kv.list({ prefix: ["event"] })) {
        await kv.delete(res.key);
    }
}

export async function likeQuestion(questionId: string, userLikeId: string) {
    const questionKey = ["question", questionId];

    // Retrieve the question object
    const questionObject = (await kv.get(questionKey)).value as Question;

    if (!questionObject) {
        throw new Error("Question not found");
    }

    // Check if the user has already liked the question
    const alreadyLiked = questionObject.likeNumber.some(like => like.userLikeId === userLikeId);
    if (alreadyLiked) {
        throw new Error("User has already liked the question");
    }

    // Add the user's like to the likeNumber array
    questionObject.likeNumber.push({ userLikeId });

    // Update the question object in the database
    const ok = await kv.atomic()
        .set(questionKey, questionObject)
        .commit();

    if (!ok) {
        throw new Error("Failed to update question");
    }

    return 200;
}

export async function unlikeQuestion(questionId: string, userLikeId: string) {
    const questionKey = ["question", questionId];

    // Retrieve the question object
    const questionObject = (await kv.get(questionKey)).value as Question;

    if (!questionObject) {
        throw new Error("Question not found");
    }

    // Find the index of the user's like in the likeNumber array
    const likeIndex = questionObject.likeNumber.findIndex(like => like.userLikeId === userLikeId);

    // Check if the user has not liked the question
    if (likeIndex === -1) {
        throw new Error("User has not liked the question");
    }

    // Remove the user's like from the likeNumber array
    questionObject.likeNumber.splice(likeIndex, 1);

    // Update the question object in the database
    const ok = await kv.atomic()
        .set(questionKey, questionObject)
        .commit();

    if (!ok) {
        throw new Error("Failed to update question");
    }

    return 200;
}

export async function saveQuestion(questionId: string) {
    const questionKey = ["question", questionId];
    const questionObject = (await kv.get(questionKey)).value as Question;

    if (!questionObject) {
        throw new Error("Question not found");
    }
    const alreadySave = questionObject.isSave
    if (alreadySave) {
        throw new Error("User has already saved the question");
    }
    questionObject.isSave = true;
    const ok = await kv.atomic()
        .set(questionKey, questionObject)
        .commit();
    if (!ok) {
        throw new Error("Failed to update question");
    }
    return 200;
}
export async function unSaveQuestion(questionId: string) {
    const questionKey = ["question", questionId];
    const questionObject = (await kv.get(questionKey)).value as Question;

    if (!questionObject) {
        throw new Error("Question not found");
    }

    questionObject.isSave = false;
    const ok = await kv.atomic()
        .set(questionKey, questionObject)
        .commit();
    if (!ok) {
        throw new Error("Failed to update question");
    }
    return 200;
}

export async function readQuestion(questionId: string) {
    const questionKey = ["question", questionId];
    const questionObject = (await kv.get(questionKey)).value as Question;

    if (!questionObject) {
        throw new Error("Question not found");
    }
    const alreadyRead = questionObject.isRead
    if (alreadyRead) {
        return 200;
    }
    questionObject.isRead = true;
    const ok = await kv.atomic()
        .set(questionKey, questionObject)
        .commit();
    if (!ok) {
        throw new Error("Failed to update question");
    }
    return 200;
}