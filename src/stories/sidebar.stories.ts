import Sidebar from "@/components/sidebar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Components/Sidebar",
	component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		chatList: [
			{
				name: "Chat Name",
				owner: "Owner",
				createdAt: "2021-10-15T00:00:00.000Z",
				updatedAt: "2021-10-15T00:00:00.000Z",
				id: "1",
				__v: 0,
			},
			{
				name: "Chat Name",
				owner: "Owner",
				createdAt: "2021-10-15T00:00:00.000Z",
				updatedAt: "2021-10-15T00:00:00.000Z",
				id: "1",
				__v: 0,
			},
		],
	},
};
