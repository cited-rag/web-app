import { cn } from "@/lib/utils";
import { ChatMetadata } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type Props = {
	chatList: ChatMetadata[];
	onSelectChat: (chatId: ChatMetadata["id"]) => void;
};

export default function SidebarChatList(props: Props) {
	return (
		<ToggleGroup
			type="single"
			className="flex flex-col gap-0"
			onValueChange={props.onSelectChat}
		>
			{props.chatList.map((chatMetadata) => (
				<ToggleGroupItem
					key={chatMetadata.id}
					value={chatMetadata.id}
					className={cn(
						"px-3 py-4 w-full flex flex-col items-start",
						"border-b-[1px] border-border/20 last:border-b-0 rounded-none",
						"hover:bg-transparent hover:shadow-[inset_0px_11px_8px_-10px_#CCC,inset_0px_-11px_8px_-10px_#CCC] shadow-accent/10 hover:text-foreground transition-all",
						"data-[state=on]:bg-primary/30 data-[state=on]:text-foreground"
					)}
				>
					<div>
						<div>{chatMetadata.name}</div>
					</div>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
