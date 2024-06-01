'use client';

import ChatLayout from '@/components/chat-layout';
import Sidebar from '@/components/sidebar';
import { useToast } from '@/components/ui/use-toast';
import { socket } from '@/lib/api/socket';
import { getUserChats, getUserDetails } from '@/lib/api/user';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatMetadataStore } from '@/store/useChatMetadataStore';
import { useChatListStore } from '@/store/useLayoutStore';
import { useMessageStore } from '@/store/useMessageStore';
import { ChatMessage, ChatStreamingResponse, StreamingUpdate } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function Home() {
	const selectedChatId = useChatListStore((s) => s.selectedChatId);
	const setUser = useAuthStore((s) => s.setUser);
	const { data: userDetails } = useQuery({
		queryKey: ['user'],
		queryFn: getUserDetails(),
	});
	const dumpMessages = useMessageStore((s) => s.dumpMessages);
	const chatMetadataList = useChatMetadataStore((s) => s.chatMetadataList);
	const setChatMetadataList = useChatMetadataStore(
		(s) => s.setChatMetadataList
	);
	const chatMetadataUpdate = useChatMetadataStore((s) => s.chatMetadataUpdate);
	const { toast } = useToast();

	useEffect(() => {
		socket.on('response', (data: ChatStreamingResponse) => {
			console.log('Response from server:', data);
			const message: ChatMessage = {
				...data,
				id: data.id + '-response',
				response: data.response.response,
				sources: data.response.source ?? [],
				streaming: data.response.source ? true : false,
			};
			console.log('Message:', message);
			dumpMessages(message);
		});

		socket.on('update', (data: StreamingUpdate) => {
			console.log('Update from server:', data);
			if (data.collection === 'chat') {
				chatMetadataUpdate(data.id, data.update);
			}
		});

		socket.on('exception', (data) => {
			console.log('Exception from server:', data);
			toast({
				title: 'Something went wrong',
				description: 'Please try reloading the page',
			});
		});

		socket.connect();

		return () => {
			socket.off('response');
			socket.off('update');
			socket.off('exception');
			socket.off('disconnect');
			socket.off('connect');
			socket.disconnect();
		};
	}, [chatMetadataUpdate, dumpMessages, toast]);

	useEffect(() => {
		if (userDetails) {
			setUser(userDetails);
		}
	}, [userDetails, setUser]);

	const { data: userChats, isFetching: userChatsIsFetching } = useQuery({
		queryKey: ['chats'],
		queryFn: getUserChats(),
	});

	useEffect(() => {
		if (userChats) {
			setChatMetadataList(userChats);
		}
	}, [userChats, setChatMetadataList]);

	const selectedChatMetadata = chatMetadataList?.find(
		(chat) => chat.id === selectedChatId
	);

	return (
		<main className='min-h-screen min-w-screen max-h-screen max-w-screen flex items-stretch space-x-3'>
			<div className='flex-0 max-w-xs w-full max-h-full'>
				<Sidebar />
			</div>
			<div className='flex-1 max-h-full overflow-hidden'>
				{selectedChatMetadata && (
					<ChatLayout chatMetadata={selectedChatMetadata} />
				)}
			</div>
		</main>
	);
}
