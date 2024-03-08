import {
    Application,
    Context,
    helpers,
    Router,
} from "https://deno.land/x/oak@v12.4.0/mod.ts";
import {
    getAllUsers,
    getUserByEmail,
    getUserById,
    getAllEvent,
    getAllQuestion,
    getUserByName,
    insertQuestion,
    insertEvent,
    insertUser,
    upsertUser,
    updateEvent,
    updateQuestion,
    deleteAllUsers,
    deleteUserById,
    deleteAllQuestion,
    deleteAllEvent,
    deleteEventById,
    deleteQuestionById,
    likeQuestion,
    unlikeQuestion,
} from "./db.ts";

const { getQuery } = helpers;
const router = new Router();

router
    .get("/users", async (ctx: Context) => {
        ctx.response.body = await getAllUsers();
    })
    .get("/questions", async (ctx: Context) => {
        ctx.response.body = await getAllQuestion();
    })
    .get("/events", async (ctx: Context) => {
        ctx.response.body = await getAllEvent();
    })
    .get("/users/:id", async (ctx: Context) => {
        const { id } = getQuery(ctx, { mergeParams: true });
        ctx.response.body = await getUserById(id);
    })
    .get("/usersByName/:name", async (ctx: Context) => {
        const { name } = getQuery(ctx, { mergeParams: true });
        ctx.response.body = await getUserByName(name);
    })
    .get("/users/email/:email", async (ctx: Context) => {
        const { email } = getQuery(ctx, { mergeParams: true });
        ctx.response.body = await getUserByEmail(email);
    })
    .post("/addUser", async (ctx: Context) => {
        const body = ctx.request.body();
        const user = await body.value;
        await insertUser(user);
        ctx.response.body = "Add user successfully."
    })
    .post("/updateUsers", async (ctx: Context) => {
        const body = ctx.request.body();
        const user = await body.value;
        await upsertUser(user);
    })
    .post("/createQuestion", async (ctx: Context) => {
        const body = ctx.request.body();
        const question = await body.value;
        await insertQuestion(question);
        ctx.response.body = "Add question successfully."
    })
    .post("/createEvent", async (ctx: Context) => {
        const body = ctx.request.body();
        const event = await body.value;
        await insertEvent(event);
        ctx.response.body = "Add event successfully."
    })
    .post("/likeQuestion/:questionId/:userLikeId", async (ctx: Context) => {
        const { questionId, userLikeId } = getQuery(ctx, { mergeParams: true });
        await likeQuestion(questionId, userLikeId);
        ctx.response.body = "Like question successfully."
    })
    .post("/unlikeQuestion/:questionId/:userLikeId", async (ctx: Context) => {
        const { questionId, userLikeId } = getQuery(ctx, { mergeParams: true });
        await unlikeQuestion(questionId, userLikeId);
        ctx.response.body = "Like question successfully."
    })
    .post("/updateQuestion/:questionId", async (ctx: Context) => {
        const body = ctx.request.body();
        const { questionId } = getQuery(ctx, { mergeParams: true });
        const question = await body.value;
        await updateQuestion(questionId, question);
        ctx.response.body = "Update question successfully."
    })
    .post("/updateEvent/:eventId", async (ctx: Context) => {
        const body = ctx.request.body();
        const { eventId } = getQuery(ctx, { mergeParams: true });
        const event = await body.value;
        await updateEvent(eventId, event);
        ctx.response.body = "Update event successfully."
    })
    .delete("/users/:id", async (ctx: Context) => {
        const { id } = getQuery(ctx, { mergeParams: true });
        await deleteUserById(id);
    })
    .delete("/deleteEvent/:id", async (ctx: Context) => {
        const { id } = getQuery(ctx, { mergeParams: true });
        await deleteEventById(id);
        ctx.response.body = "Delete an event successfully.";
    })
    .delete("/deleteQuestionById/:id", async (ctx: Context) => {
        const { id } = getQuery(ctx, { mergeParams: true });
        await deleteQuestionById(id);
        ctx.response.body = "Delete a question successfully.";
    })
    .delete("/deleteAllUser", async (ctx) => {
        await deleteAllUsers();
        ctx.response.body = "Delete all user successfully.";
    })
    .delete("/deleteAllQuestion", async (ctx) => {
        await deleteAllQuestion();
        ctx.response.body = "Delete all question successfully.";
    })
    .delete("/deleteAllEvent", async (ctx) => {
        await deleteAllEvent();
        ctx.response.body = "Delete all event successfully.";
    });

const app = new Application();

// Enable CORS
app.use(async (ctx, next) => {
    ctx.response.headers.set("Access-Control-Allow-Origin", "*");
    ctx.response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    ctx.response.headers.set(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
