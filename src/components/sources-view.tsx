import { getChatSources } from "@/lib/api/chat";
import { cn } from "@/lib/utils";
import { ChatMetadata } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FilePlus, Link2 } from "lucide-react";
import { useRef, useState } from "react";
import Dropzone from "./dropzone";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import SourceListItem from "./source-list-item";
import { addSourceURL, deleteSource } from "@/lib/api/source";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { useToast } from "./ui/use-toast";

type Props = {
	chatMetadata: ChatMetadata;
};

export default function SourcesView(props: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const [sourceUrl, setSourceUrl] = useState("");
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { data: sources } = useQuery({
		queryKey: ["chat-sources", props.chatMetadata.id],
		queryFn: getChatSources(props.chatMetadata.id),
	});

	const addSourceMutation = useMutation({
		mutationKey: ["add-source", sourceUrl],
		mutationFn: async (sourceUrl: string) => {
			const stripedURL = sourceUrl.replace(/\s/g, "");
			return addSourceURL(props.chatMetadata.id, stripedURL)();
		},
		onSuccess: (source, variables) => {
			setSourceUrl("");
			queryClient.invalidateQueries({
				queryKey: ["chat-sources", props.chatMetadata.id],
			});
		},
		onError: () => {
			toast({
				title: "Failed to add source",
				description:
					"Check if the URL is valid PDF or Text Document and is not already added.",
			});
		},
	});

	const deleteSourceMutation = useMutation({
		mutationFn: async (sourceId: string) => {
			return deleteSource(sourceId)();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["chat-sources", props.chatMetadata.id],
			});
		},
		onError: () => {
			toast({
				title: "Failed to delete source",
				description: "Please try again.",
			});
		},
	});

	const onTextAreaKeyPressAction = (e: React.KeyboardEvent) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			addSourceMutation.mutate(sourceUrl);
		}
	};

	const urlSources = sources?.filter(
		(source) => source.origin[0].type === "url"
	);

	return (
		<div className="w-64">
			<h2 className="text-3xl px-2 font-semibold tracking-tight text-accent">
				Sources
			</h2>
			<Separator className="mt-4 mb-5" />
			<div className="px-2 space-y-5">
				<div className="space-y-3 transition-all">
					<h3 className="text-xl font-semibold tracking-tight text-accent">
						Web Sources
					</h3>
					<form
						ref={formRef}
						className="relative"
						onSubmit={(e) => {
							e.preventDefault();
							addSourceMutation.mutate(sourceUrl);
						}}
					>
						<Textarea
							placeholder=" "
							className={cn(
								"h-20 bg-primary/20 border-2 border-border/40 border-dashed rounded-lg resize-none",
								"text-accent/80 text-xs placeholder:text-center placeholder:text-accent/40 font-medium peer",
								"focus-visible:ring-primary focus-visible:bg-white/60"
							)}
							value={sourceUrl}
							onChange={(e) => setSourceUrl(e.target.value)}
							onKeyDown={onTextAreaKeyPressAction}
						/>
						<div
							className={cn(
								"absolute top-0 left-0 right-0 h-20 flex flex-col items-center justify-center space-y-2",
								"pointer-events-none opacity-0 peer-placeholder-shown:opacity-100 transition-all"
							)}
						>
							<Link2 className="w-6 h-6 stroke-accent/40" />
							<span className="font-medium text-accent/40 text-xs">
								Enter or Drop URL to Add
							</span>
						</div>
						<Button
							type="submit"
							size="sm"
							className="block peer-placeholder-shown:hidden w-full mt-2"
						>
							Add
						</Button>
					</form>
					<div className="flex flex-col transition-all border-[1px] border-accent/10 rounded-lg overflow-hidden">
						{urlSources?.map((source) => (
							<SourceListItem
								source={source}
								key={source.id}
								deleteSourceAction={(sourceId) => {
									deleteSourceMutation.mutate(sourceId);
								}}
							/>
						))}
					</div>
				</div>
				<div className="space-y-3">
					<h3 className="text-xl font-semibold tracking-tight text-accent">
						Files
					</h3>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className="w-full hover:cursor-default">
								<Dropzone
									classNameWrapper="max-h-20 h-full opacity-50 cursor-not-allowed hover:cursor-not-allowed hover:border-accent/20 pointer-events-none"
									dropMessage="Select or Drop Files to Upload"
									handleOnDrop={() => {}}
									label={
										<div className="flex flex-col space-y-2 text-accent/40 items-center justify-center">
											<FilePlus className="w-6 h-6 stroke-accent/40" />
											<span className="font-medium">
												Select or Drop Files to Upload
											</span>
										</div>
									}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p>Coming soon</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
}
