"use client";

import ChatLayout from "@/components/chat-layout";
import Sidebar from "@/components/sidebar";
import { getUserChats, getUserDetails } from "@/lib/api/user";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
	const [selectedChatId, setSelectedChatId] = useState<string | undefined>(
		undefined
	);
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
		<main className="min-h-screen min-w-screen flex items-stretch gap-3">
			<Sidebar chatList={userChats ?? []} onSelectChat={setSelectedChatId} />
			{selectedChatMetadata && (
				<ChatLayout chatMetadata={selectedChatMetadata} />
			)}
		</main>
	);
}
