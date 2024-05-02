// Importing create function from the Zustand library
import { create } from "zustand";
import { ChatMessage, ChatMetadata } from "@/types";

// Defining an interface for the store's state
interface MessageStoreInterface {
	groupedMessages: Map<ChatMetadata["id"], ChatMessage[]>;
	dumpMessages(...messages: ChatMessage[]): void;
}

// create our store
export const useMessageStore = create<MessageStoreInterface>((set) => ({
	groupedMessages: new Map<ChatMetadata["id"], ChatMessage[]>(),
	dumpMessages: (...messages) =>
		set((state) => {
			const groupedMessages = new Map(state.groupedMessages);
			for (const message of messages) {
				const currentMessages = groupedMessages.get(message.chatId) ?? [];
				groupedMessages.set(message.chatId, [...currentMessages, message]);
			}
			return { groupedMessages };
		}),
}));
