import { cn } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import ChatAvatarPill from "./chat-avatar-pill";
import { ChatMessage } from "@/types";

type Props = {
	chatItem: ChatMessage;
};

export default function ChatBubble(props: Props) {
	const isRequest = props?.chatItem?.type === "request";

	return (
		<div className="flex flex-col mb-6">
			<ChatAvatarPill isUserMessage={isRequest} />
			<div
				className={cn(
					"flex border-2 rounded-xl ml-3 -mt-5",
					isRequest
						? "bg-primary/5 border-[#B4FAF2]"
						: "bg-secondary/40 border-[#FFEE9666]"
				)}
			>
				<p className="p-4 pt-5">
					{props.chatItem?.type === "request"
						? props.chatItem.query
						: props.chatItem.response}
				</p>
			</div>
		</div>
	);
}
