import React from "react";
import ConversationView from "./conversation-view";
import { ChatMetadata } from "@/types";
import { useMessageStore } from "@/store/useMessageStore";

type Props = {
	chatMetadata: ChatMetadata;
};

export default function ChatLayout(props: Props) {
	const messages =
		useMessageStore((s) => s.groupedMessages).get(props.chatMetadata.id) ?? [];

	return (
		<div className="flex-1 flex flex-col max-h-full p-4 pl-0">
			<h2 className="px-4 scroll-m-20 text-3xl pb-3 font-semibold tracking-tight first:mt-0 text-accent">
				{props.chatMetadata?.name ?? "Chat with Cited RAG"}
			</h2>
			<div className="flex-1 flex flex-col bg-card/40 border-2 border-card-border rounded-xl backdrop-blur-md p-3">
				<ConversationView
					chatMetadata={props.chatMetadata}
					messages={messages}
				/>
			</div>
		</div>
	);
}
