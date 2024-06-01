import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import ChatAvatarPill from './chat-avatar-pill';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

type Props = {
	chatItem: ChatMessage;
};

export default function ChatBubble(props: Props) {
	const isRequest = props.chatItem.type === 'request';

	return (
		<div className='flex flex-col mb-6'>
			<ChatAvatarPill isUserMessage={isRequest} />
			<div
				className={cn(
					'border-2 rounded-xl ml-3 -mt-5',
					isRequest
						? 'bg-primary/5 border-[#B4FAF2]'
						: 'bg-secondary/40 border-[#FFEE9666]'
				)}
			>
				<p className='p-4 pt-5'>
					{props.chatItem.type === 'request'
						? props.chatItem.query
						: props.chatItem.response}
					{props.chatItem.type === 'response' && props.chatItem.streaming && (
						<span className='animate-pulse inline-block w-3 h-3 bg-primary rounded-full ml-2' />
					)}
				</p>
				{props.chatItem.type === 'response' &&
					props.chatItem.sources?.length > 0 && (
						<>
							<Separator className='bg-[#FFEE96]' />
							<div className='flex flex-row items-center justify-between p-4 bg-[#FFEE9620]'>
								{props.chatItem.sources.map((s) => (
									<Badge
										key={s.source + s.pages.join(' ')}
										className='flex flex-row items-center text-foreground'
									>
										{s.source}
									</Badge>
								))}
							</div>
						</>
					)}
			</div>
		</div>
	);
}
