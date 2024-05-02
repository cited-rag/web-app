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
	source: Source["id"];
	pages: string[];
};

export type ChatResponseSource = ChatResponsePDFSource;

export type ChatResponse = {
	type: "response";
	response: string;
	sources: ChatResponseSource[];
};

export type ChatRequest = {
	type: "request";
	query: string;
};

export type ChatMessage = { chatId: ChatMetadata["id"] } & (
	| ChatRequest
	| ChatResponse
);

export type URLSource = {
	target: string;
	type: "url";
};

export type Source = {
	chat: ChatMetadata["id"];
	owner: User["id"];
	status: "loading" | "loaded" | "error";
	createdAt: string;
	updatedAt: string;
	__v: 0;
	id: string;
} & URLSource;
