// Importing create function from the Zustand library
import { ChatMetadata } from "@/types";
import { create } from "zustand";

// Defining an interface for the store's state
interface ChatListStoreInterface {
	selectedChatId: ChatMetadata["id"] | undefined;
	selectChat(id: ChatMetadata["id"]): void;
}

// create our store
export const useChatListStore = create<ChatListStoreInterface>((set) => ({
	selectedChatId: undefined,
	selectChat: (id) => set({ selectedChatId: id }),
}));
