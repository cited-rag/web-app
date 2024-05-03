import Branding from "@/components/branding";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChatMetadata } from "@/types";
import ProfileBadge from "./profile-badge";
import SidebarChatList from "./sidebar-chat-list";
import { ScrollArea } from "./ui/scroll-area";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "@/lib/api/chat";
import { useChatListStore } from "@/store/useLayoutStore";
import { Button } from "./ui/button";

type Props = {
	chatList: ChatMetadata[];
};

export default function Sidebar(props: Props) {
	const selectChat = useChatListStore((s) => s.selectChat);

	const queryClient = useQueryClient();

	const createChatMutation = useMutation({
		mutationFn: () => {
			return createChat()();
		},
		onSuccess: (newChatMetadata) => {
			queryClient.setQueryData(["chats"], [newChatMetadata, ...props.chatList]);
			selectChat(newChatMetadata.id);
		},
	});

	return (
		<div
			className={cn(
				"pt-6 px-4 w-full h-full flex flex-col",
				"backdrop-blur-md bg-card/40 border-r-2 border-card-border"
			)}
		>
			<Branding showName />
			<Separator className="h-1 mt-4 mb-5" />
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-accent">
				Chats
			</h1>
			<Button
				variant="ghost"
				className={cn(
					"flex items-center text-left h-auto py-4 px-3 mt-4 border-b-border/20 border-b-2",
					"border-b-2 border-border/40 last:border-b-0 rounded-none",
					"group hover:bg-accent/20 hover:text-foreground transition-all"
				)}
				onClick={() => createChatMutation.mutate()}
			>
				<div className={cn("flex-1 text-base font-medium text-foreground/60")}>
					Create Chat
				</div>
				<Plus className="w-5 h-5 stroke-foreground/50" />
			</Button>
			<ScrollArea className="flex-1">
				<SidebarChatList chatList={props.chatList} />
			</ScrollArea>
			<Separator className="h-1" />
			<ProfileBadge />
		</div>
	);
}
