import { ChatMetadata } from "@/types";
import ConversationView from "./conversation-view";
import SourcesView from "./sources-view";
import { Separator } from "./ui/separator";

type Props = {
	chatMetadata: ChatMetadata;
};

export default function ChatLayout(props: Props) {
	return (
		<div className="h-full flex flex-col flex-nowrap p-4 pl-0">
			<h2 className="flex-grow-0 px-4 scroll-m-20 text-3xl pb-3 font-semibold tracking-tight first:mt-0 text-accent">
				{props.chatMetadata?.name ?? "Chat with Cited RAG"}
			</h2>
			<div className="flex-grow min-h-0 flex flex-row bg-card/40 border-2 border-card-border rounded-xl backdrop-blur-md p-3 gap-3">
				<ConversationView chatMetadata={props.chatMetadata} />
				<Separator orientation="vertical" className="w-1" />
				<SourcesView chatMetadata={props.chatMetadata} />
			</div>
		</div>
	);
}
