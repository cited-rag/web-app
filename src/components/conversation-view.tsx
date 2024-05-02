import { queryChat } from "@/lib/api/chat";
import { ChatMessage, ChatMetadata, ChatRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { ArrowUpFromDot, Loader } from "lucide-react";
import ChatBubble from "./chat-bubble";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { useMessageStore } from "@/store/useMessageStore";

type Props = {
	chatMetadata: ChatMetadata;
	messages: ChatMessage[];
};

export default function ConversationView(props: Props) {
	const [prompt, setPrompt] = useState("");
	const dumpMessages = useMessageStore((s) => s.dumpMessages);

	const mutation = useMutation({
		mutationKey: ["chat", props.chatMetadata?.id, prompt],
		mutationFn: (chatRequest: ChatMessage & ChatRequest) => {
			return queryChat(chatRequest.chatId, chatRequest.query)();
		},
	});

	const onSubmitAction = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (prompt.trim() === "") return;
		const chatRequest: ChatMessage & ChatRequest = {
			chatId: props.chatMetadata?.id,
			type: "request",
			query: prompt,
		};

		const chatResponse = await mutation.mutateAsync(chatRequest);
		dumpMessages(chatRequest, chatResponse);
		setPrompt("");
	};

	return (
		<div className="flex-1 flex flex-col">
			<ScrollArea className="flex-1">
				{props.messages?.map((message) => (
					<ChatBubble
						key={message.type === "request" ? message.query : message.response}
						chatItem={message}
					/>
				))}
			</ScrollArea>
			<form className="relative" onSubmit={onSubmitAction}>
				<Input
					disabled={mutation.isPending}
					multiple
					aria-multiline
					type="text"
					className="w-full p-3 h-auto bg-card/40 rounded-xl border-2 border-card-border focus-visible:ring-[#B4FAF2]"
					placeholder="Type a message..."
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<Button
					type="submit"
					variant={"ghost"}
					className="absolute right-1 top-1 bottom-1 h-auto rounded-lg hover:bg-primary/40"
				>
					{mutation.isPending ? (
						<Loader className="animate-spin" />
					) : (
						<ArrowUpFromDot className="z-10 w-6 h-6 text-accent cursor-pointer" />
					)}
				</Button>
			</form>
		</div>
	);
}
