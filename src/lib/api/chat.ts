import axios from "@/lib/axios";
import { ChatMessage, ChatMetadata, ChatResponse, Source } from "@/types";

export function createChat() {
	return async () => {
		const response = await axios.put<ChatMetadata>(`/chat`);

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to create chat");
	};
}

export function getChatDetails(id: ChatMetadata["id"]) {
	return async () => {
		const response = await axios.post<ChatMetadata>(`/chat`, { id });

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to fetch chat");
	};
}

export function queryChat(id: ChatMetadata["id"], query: string) {
	return async () => {
		const response = await axios.post<ChatResponse>("/chat/query", {
			id,
			query,
		});

		if (response.status >= 200 && response.status < 300) {
			const message: ChatMessage = {
				...response.data,
				chatId: id,
				type: "response",
			};
			return message;
		}

		throw new Error("Failed to fetch chats");
	};
}

export function getChatSources(chatId: ChatMetadata["id"]) {
	return async () => {
		const response = await axios.post<Source[]>(`/chat/source`, { id: chatId });

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to fetch sources");
	};
}

export function deleteChat(id: ChatMetadata["id"]) {
	return async () => {
		const response = await axios.delete(`/chat`, {
			data: { id },
		});

		if (response.status >= 200 && response.status < 300) {
			return true;
		}

		throw new Error("Failed to delete chat");
	};
}
