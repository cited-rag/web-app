"use client";

import ChatLayout from "@/components/chat-layout";
import Sidebar from "@/components/sidebar";
import { getUserChats, getUserDetails } from "@/lib/api/user";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatListStore } from "@/store/useLayoutStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
	const selectedChatId = useChatListStore((s) => s.selectedChatId);
	const setUser = useAuthStore((s) => s.setUser);
	const { data: userDetails } = useQuery({
		queryKey: ["user"],
		queryFn: getUserDetails(),
	});

	useEffect(() => {
		if (userDetails) {
			setUser(userDetails);
		}
	}, [userDetails, setUser]);

	const { data: userChats, isFetching: userChatsIsFetching } = useQuery({
		queryKey: ["chats"],
		queryFn: getUserChats(),
	});
	const selectedChatMetadata = userChats?.find(
		(chat) => chat.id === selectedChatId
	);

	return (
		<main className="min-h-screen min-w-screen max-h-screen max-w-screen flex items-stretch space-x-3">
			<div className="flex-0 max-w-xs w-full max-h-full">
				<Sidebar chatList={userChats ?? []} />
			</div>
			<div className="flex-1 max-h-full overflow-hidden">
				{selectedChatMetadata && (
					<ChatLayout chatMetadata={selectedChatMetadata} />
				)}
			</div>
		</main>
	);
}
