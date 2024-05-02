import { cn, getInitials } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
	isUserMessage?: boolean;
};

export default function ChatAvatarPill(props: Props) {
	const user = useAuthStore((s) => s.user);

	return (
		<div
			className={cn(
				"self-start flex items-center gap-2 rounded-full p-1 pr-3 shadow-2xl z-10",
				"border-[1px]  bg-card/30",
				props.isUserMessage
					? "bg-[#EEFFFD] border-[#89FFF1]"
					: "bg-[#FBFAEF] border-[#FFEE96]"
			)}
		>
			<Avatar className="h-5 w-5">
				{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
				<AvatarFallback
					className={cn(
						"text-xs uppercase",
						props.isUserMessage ? "bg-[#89FFF190]" : "bg-[#FFEE96a0]"
					)}
				>
					{props.isUserMessage
						? user?.name
							? getInitials(user?.name)?.[0]
							: "-"
						: "C"}
				</AvatarFallback>
			</Avatar>
			<p className="text-sm text-muted-foreground">
				{props.isUserMessage ? user?.name ?? "-" : "Cited RAG"}
			</p>
		</div>
	);
}
