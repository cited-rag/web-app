import { Source } from "@/types";
import { EllipsisVertical, Link } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

type Props = {
	source: Source;
	deleteSourceAction: (id: Source["id"]) => void;
};

export default function SourceListItem(props: Props) {
	return (
		<div
			className={cn(
				"group flex flex-row bg-[#FBFAEF99] space-x-2 items-center",
				"border-b-[1px] border-b-accent/10 last:border-b-0"
			)}
		>
			<Link className="w-4 h-4 flex-shrink-0 stoke-accent/60 ml-3 my-3" />
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<p className="flex-grow text-sm text-accent/80 text-wrap text-ellipsis line-clamp-2">
							{props.source.target}
						</p>
					</TooltipTrigger>
					<TooltipContent>
						<p className="text-sm text-accent/80 text-wrap text-ellipsis line-clamp-2">
							{props.source.target}
						</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DropdownMenu>
				<DropdownMenuTrigger
					className={cn(
						"invisible group-hover:visible data-[state=open]:visible transition-all pr-3 py-3"
					)}
				>
					<EllipsisVertical className="w-5 h-5 stroke-accent/60" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						className="focus:bg-red-400"
						onClick={() => {
							props.deleteSourceAction(props.source.id);
						}}
					>
						Delete Source
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
