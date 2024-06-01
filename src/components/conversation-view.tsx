import { getConversation, queryChat } from '@/lib/api/chat';
import { useMessageStore } from '@/store/useMessageStore';
import { ChatMessage, ChatMetadata, ChatStreamingResponse } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowUpFromDot, Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatBubble from './chat-bubble';
import { Button } from './ui/button';
import { Input } from './ui/input';
import socket from '@/lib/api/socket';

type Props = {
	chatMetadata: ChatMetadata;
};

export default function ConversationView(props: Props) {
	const scrollViewRef = useRef<HTMLDivElement>(null);

	const [prompt, setPrompt] = useState('');
	const allMessages = useMessageStore((s) => s.groupedMessages);
	const chatMessages = allMessages.get(props.chatMetadata.id);
	const dumpMessages = useMessageStore((s) => s.dumpMessages);

	const { data: conversationHistory } = useQuery({
		queryKey: ['chat', props.chatMetadata?.id],
		queryFn: () => getConversation(props.chatMetadata?.id)(),
	});

	useEffect(() => {
		if (conversationHistory) {
			dumpMessages(...conversationHistory);
		}
	}, [conversationHistory, dumpMessages]);

	useEffect(() => {
		scrollViewRef.current?.lastElementChild?.scrollIntoView();
	}, [chatMessages]);

	const mutation = useMutation({
		mutationFn: (query: string) => {
			return queryChat(props.chatMetadata.id, query)();
		},
	});

	const onSubmitAction = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (prompt.trim() === '') return;
		const chatQueryResponse = await mutation.mutateAsync(prompt);
		dumpMessages(...chatQueryResponse);
		setPrompt('');
	};

	return (
		<div className='flex-1 flex flex-col'>
			<div ref={scrollViewRef} className='flex-1 overflow-scroll'>
				{chatMessages?.map((message) => (
					<ChatBubble key={message.id} chatItem={message} />
				))}
			</div>
			<form className='relative' onSubmit={onSubmitAction}>
				<Input
					disabled={mutation.isPending}
					multiple
					aria-multiline
					type='text'
					className='w-full p-3 h-auto bg-card/40 rounded-xl border-2 border-card-border focus-visible:ring-[#B4FAF2]'
					placeholder='Type a message...'
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<Button
					type='submit'
					variant={'ghost'}
					className='absolute right-1 top-1 bottom-1 h-auto rounded-lg hover:bg-primary/40'
				>
					{mutation.isPending ? (
						<Loader className='animate-spin' />
					) : (
						<ArrowUpFromDot className='z-10 w-6 h-6 text-accent cursor-pointer' />
					)}
				</Button>
			</form>
		</div>
	);
}
