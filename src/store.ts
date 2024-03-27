import { create } from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";

type State = {
    draft: string;
    refresh: number;
    isTyping: boolean;
    todos: { text: string }[];
    setDraft: (draft: string) => void;
    addTodo: () => void;
    setRefresh: () => void;
    setReset: () => void;
    deleteTodo: (index: number) => void;
};

const client = createClient({
    publicApiKey:
        "pk_dev_7daolzGQztFvsUT_PEJhzj_dvgXDD9E9Kh355CuBIITJftHcsO27P5D14AI_qTtx",
});

const useStore = create<WithLiveblocks<State>>()(
    liveblocks(
        (set) => ({
            draft: "",
            refresh: 0,
            isTyping: false,
            todos: [],
            setDraft: (draft) => set({ draft: draft }),
            setRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
            addTodo: () =>
                set((state) => ({
                    todos: state.todos.concat({ text: state.draft }),
                    draft: "",
                })),
            setReset: () =>
                set(() => ({
                    todos: [],
                })),
            deleteTodo: (index) =>
                set((state) => ({
                    todos: state.todos.filter((_, i) => index !== i),
                })),
        }),
        {
            client,
            presenceMapping: { isTyping: true },
            storageMapping: { todos: true },
        }
    )
);

export default useStore;
