import axios from '@/lib/axios';
import {
	ChatItem,
	ChatMessage,
	ChatMetadata,
	ChatResponse,
	QueryResponse,
	Source,
} from '@/types';

export function createChat() {
	return async () => {
		const response = await axios.put<ChatMetadata>(`/chat`);

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error('Failed to create chat');
	};
}

export function getChatDetails(id: ChatMetadata['id']) {
	return async () => {
		const response = await axios.post<ChatMetadata>(`/chat`, { id });

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error('Failed to fetch chat');
	};
}

export function queryChat(id: ChatMetadata['id'], query: string) {
	return async () => {
		const response = await axios.post<QueryResponse>('/chat/query', {
			id,
			query,
		});

		if (response.status >= 200 && response.status < 300) {
			let m = response.data;
			let requestMessage: ChatMessage = {
				chatId: id,
				id: m.response.queryId + '-request',
				type: 'request',
				query: query,
			};

			let responseMessage: ChatMessage = {
				chatId: id,
				id: m.response.queryId + '-response',
				type: 'response',
				response: '',
				streaming: true,
				sources: [],
			};

			return [requestMessage, responseMessage];
		}

		throw new Error('Failed to fetch chats');
	};
}

export function getChatSources(chatId: ChatMetadata['id']) {
	return async () => {
		const response = await axios.post<Source[]>(`/chat/sources`, {
			id: chatId,
		});

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error('Failed to fetch sources');
	};
}

export function deleteChat(id: ChatMetadata['id']) {
	return async () => {
		const response = await axios.delete(`/chat`, {
			data: { id },
		});

		if (response.status >= 200 && response.status < 300) {
			return true;
		}

		throw new Error('Failed to delete chat');
	};
}

export function getConversation(chatId: ChatMetadata['id']) {
	return async () => {
		const response = await axios.post<ChatItem[]>(`/chat/conversations`, {
			id: chatId,
		});

		if (response.status >= 200 && response.status < 300) {
			const data = response.data;
			const messages: ChatMessage[] = data.flatMap((m) => {
				let request: ChatMessage = {
					chatId,
					id: m.id + '-request',
					type: 'request',
					query: m.query,
				};
				let response: ChatMessage = {
					chatId,
					id: m.id + '-response',
					type: 'response',
					response: m.response,
					sources: m.source,
					streaming: false,
				};

				return [request, response];
			});

			return messages;
		}

		throw new Error('Failed to fetch conversation');
	};
}
