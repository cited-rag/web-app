import { deleteChat } from '@/lib/api/chat';
import { cn } from '@/lib/utils';
import { useChatMetadataStore } from '@/store/useChatMetadataStore';
import { useChatListStore } from '@/store/useLayoutStore';
import { ChatMetadata } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export default function SidebarChatList() {
	const selectedChatId = useChatListStore((s) => s.selectedChatId);
	const setSelectedChatId = useChatListStore((s) => s.selectChat);
	const chatMetadataList = useChatMetadataStore((s) => s.chatMetadataList);

	const queryClient = useQueryClient();
	const deleteChatMutation = useMutation({
		mutationFn: (chatId: ChatMetadata['id']) => {
			return deleteChat(chatId)();
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['chats'] });
		},
	});

	return (
		<ToggleGroup
			type='single'
			className='flex flex-col gap-0'
			value={selectedChatId}
			onValueChange={setSelectedChatId}
		>
			{chatMetadataList.map((chatMetadata) => (
				<ToggleGroupItem
					key={chatMetadata.id}
					value={chatMetadata.id}
					className={cn(
						'px-3 py-4 w-full flex flex-row h-auto',
						'border-b-[1px] border-border/20 last:border-b-0 rounded-none',
						'group hover:bg-transparent hover:shadow-[inset_0px_20px_20px_-10px_#B4FAF2,inset_0px_-20px_20px_-10px_#B4FAF2] shadow-accent/10 hover:text-foreground transition-all',
						'data-[state=on]:bg-primary/30 data-[state=on]:text-foreground'
					)}
				>
					<div className='flex-1 text-left'>
						<div className='text-base font-normal text-foreground'>
							{chatMetadata.name}
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger
							className={cn(
								'invisible group-hover:visible data-[state=open]:visible transition-all'
							)}
						>
							<EllipsisVertical className='w-5 h-5' />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								className='focus:bg-red-400'
								onClick={() => {
									deleteChatMutation.mutate(chatMetadata.id);
								}}
							>
								Delete Chat
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
