import Branding from "@/components/branding";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChatMetadata } from "@/types";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import SidebarListItem from "./sidebar-list-item";
import { ToggleGroup } from "./ui/toggle-group";
import SidebarChatList from "./sidebar-chat-list";
import ProfileBadge from "./profile-badge";

type Props = {
	chatList: ChatMetadata[];
	onSelectChat: (chatId: ChatMetadata["id"]) => void;
};

export default function Sidebar(props: Props) {
	return (
		<div
			className={cn(
				"pt-6 px-4 max-w-xs flex-1 flex flex-col",
				"backdrop-blur-md bg-card/40 border-r-2 border-card-border"
			)}
		>
			<Branding showName />
			<Separator className="h-1 mt-4 mb-5" />
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-accent">
				Chats
			</h1>
			<ScrollArea className="flex-1 mt-4">
				<SidebarChatList
					chatList={props.chatList}
					onSelectChat={props.onSelectChat}
				/>
			</ScrollArea>
			<Separator className="h-1" />
			<ProfileBadge />
		</div>
	);
}
