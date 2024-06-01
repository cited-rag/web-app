// Importing create function from the Zustand library
import { create } from 'zustand';
import { ChatMessage, ChatMetadata } from '@/types';

// Defining an interface for the store's state
interface ChatMetadataStoreInterface {
	chatMetadataList: ChatMetadata[];
	setChatMetadataList(chatMetadataList: ChatMetadata[]): void;
	chatMetadataUpdate(
		id: ChatMetadata['id'],
		updates: Partial<ChatMetadata>
	): void;
}

// create our store
export const useChatMetadataStore = create<ChatMetadataStoreInterface>(
	(set) => ({
		chatMetadataList: [],
		setChatMetadataList: (chatMetadataList) => set({ chatMetadataList }),
		chatMetadataUpdate: (id, updates) =>
			set((state) => {
				const chatMetadataList = state.chatMetadataList.map((chatMetadata) => {
					if (chatMetadata.id === id) {
						return { ...chatMetadata, ...updates };
					}
					return chatMetadata;
				});
				return { chatMetadataList };
			}),
	})
);
