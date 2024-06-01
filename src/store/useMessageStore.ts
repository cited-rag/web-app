// Importing create function from the Zustand library
import { ChatMessage, ChatMetadata } from '@/types';
import { create } from 'zustand';

// Defining an interface for the store's state
interface MessageStoreInterface {
	groupedMessages: Map<ChatMetadata['id'], ChatMessage[]>;
	dumpMessages(...messages: ChatMessage[]): void;
}

// create our store
export const useMessageStore = create<MessageStoreInterface>((set) => ({
	groupedMessages: new Map<ChatMetadata['id'], ChatMessage[]>(),

	dumpMessages: (...messages) =>
		set((state) => {
			const groupedMessages = new Map(state.groupedMessages);
			for (const message of messages) {
				const currentMessages = groupedMessages.get(message.chatId) ?? [];
				let indexOf = currentMessages.findIndex((m) => m.id === message.id);
				if (indexOf !== -1) {
					currentMessages[indexOf] = message;
				} else {
					currentMessages.push(message);
				}
				groupedMessages.set(message.chatId, [...currentMessages]);
			}
			return { groupedMessages };
		}),
}));
