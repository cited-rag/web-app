import { cn } from "@/lib/utils";
import { ChatMetadata } from "@/types";
import { HTMLAttributes } from "react";
import { Toggle } from "./ui/toggle";
import { ToggleGroupItem } from "./ui/toggle-group";

type Props = {
	className?: HTMLAttributes<HTMLDivElement>["className"];
	chatMetadata: ChatMetadata;
};

export default function SidebarListItem(props: Props) {
	return (
		<ToggleGroupItem
			value={props.chatMetadata.id}
			className={cn(
				"px-3 py-4 w-full flex flex-col items-start",
				"border-b-[1px] border-border/20 last:border-b-0 rounded-none",
				"hover:bg-transparent hover:shadow-[inset_0px_11px_8px_-10px_#CCC,inset_0px_-11px_8px_-10px_#CCC] shadow-accent/10 hover:text-foreground transition-all",
				"data-[state=on]:bg-primary/30 data-[state=on]:text-foreground",
				props.className
			)}
		>
			<div>
				<div>{props.chatMetadata.name}</div>
			</div>
		</ToggleGroupItem>
	);
}
