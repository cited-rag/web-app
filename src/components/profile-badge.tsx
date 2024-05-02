import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ArrowUp, ChevronUp } from "lucide-react";

export default function ProfileBadge() {
	const user = useAuthStore((s) => s.user);
	const setAuthentication = useAuthStore((s) => s.setAuthentication);
	const router = useRouter();

	const signOutAction = () => {
		deleteCookie("token");
		setAuthentication(false);
		router.replace("/");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="py-4 px-2 inline-flex items-baseline gap-2 hover:bg-accent/10 transition-colors">
					<Avatar>
						<AvatarFallback className="uppercase bg-accent/10">
							{user?.name ? getInitials(user?.name) : "-"}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<h1 className="text-lg font-semibold text-accent">{user?.name}</h1>
					</div>
					<ChevronUp className="w-4 h-4 text-accent" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem disabled>Profile</DropdownMenuItem>
				<DropdownMenuItem disabled>Billing</DropdownMenuItem>
				<DropdownMenuItem disabled>Team</DropdownMenuItem>
				<DropdownMenuItem disabled>Subscription</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={signOutAction} className="focus:bg-red-400">
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
