export type ChatMetadata = {
	name: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
	id: string;
	__v: number;
};

export type User = {
	id: string;
	name: string;
};

export type ChatResponsePDFSource = {
	source: Source['id'];
	pages: string[];
};

export type ChatResponseSource = ChatResponsePDFSource;

export type ChatResponse = {
	type: 'response';
	response: string;
	sources: ChatResponseSource[];
	streaming: boolean;
};

export type ChatRequest = {
	type: 'request';
	query: string;
};

export type ChatMessage = { id: string; chatId: ChatMetadata['id'] } & (
	| ChatRequest
	| ChatResponse
);

export type ChatStreamingResponse = {
	id: string;
	chatId: ChatMetadata['id'];
	response: {
		response: string;
		source: ChatResponseSource[] | undefined;
	};
} & ChatResponse;

export type URLSource = {
	target: string;
	type: 'url';
};

export type DataSource = URLSource;

export type Source = {
	target: string;
	dataType: 'url' | 'none';
	origin: DataSource[];
	chat: ChatMetadata['id'];
	owner: User['id'];
	status: 'loading' | 'loaded' | 'error';
	createdAt: string;
	updatedAt: string;
	__v: 0;
	id: string;
} & URLSource;

export type ChatItem = {
	chat: ChatMetadata['id'];
	owner: User['id'];
	query: string;
	response: string;
	source: ChatResponseSource[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
};

export type QueryResponse = {
	response: {
		queryId: string;
	};
};

export type ChatMetadataUpdate = {
	collection: 'chat';
	id: ChatMetadata['id'];
	update: Partial<ChatMetadata>;
};

export type StreamingUpdate = ChatMetadataUpdate;
