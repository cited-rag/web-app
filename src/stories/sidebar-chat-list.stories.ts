import SidebarChatList from "@/components/sidebar-chat-list";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Sidebar/Chat List",
	component: SidebarChatList,
} satisfies Meta<typeof SidebarChatList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		chatList: [
			{
				name: "Chat 1",
				owner: "Owner",
				createdAt: "2021-10-15T00:00:00.000Z",
				updatedAt: "2021-10-15T00:00:00.000Z",
				id: "1",
				__v: 0,
			},
			{
				name: "Chat 2",
				owner: "Owner",
				createdAt: "2021-10-15T00:00:00.000Z",
				updatedAt: "2021-10-15T00:00:00.000Z",
				id: "2",
				__v: 1,
			},
		],
	},
};
