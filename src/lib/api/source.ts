import { ChatMetadata, Source } from "@/types";
import axios from "@/lib/axios";

export function addSourceURL(chatId: ChatMetadata["id"], sourceURL: string) {
	return async () => {
		const response = await axios.post<Source>(`/source/url`, {
			chat: chatId,
			url: sourceURL,
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to add source");
	};
}

export function getSource(id: Source["id"]) {
	return async () => {
		const response = await axios.post<Source>(`/source`);

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to fetch source");
	};
}

export function deleteSource(id: Source["id"]) {
	return async () => {
		const response = await axios.delete(`/source`, {
			data: { id },
		});

		if (response.status >= 200 && response.status < 300) {
			return true;
		}

		throw new Error("Failed to delete source");
	};
}
