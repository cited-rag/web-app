import { cn } from "@/lib/utils";
import { generate } from "generate-passphrase";
import { ArrowRight, Copy } from "lucide-react";
import CopyToClipboardButton from "./copy-to-clipboard-button";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { useQuery } from "@tanstack/react-query";
import { useThrottle } from "@uidotdev/usehooks";

type Props = {
	actionButtonOnClick: () => void;
};

export default function SignUpCard(props: Props) {
	const passphrase = generate({
		length: 12,
		separator: " ",
		numbers: false,
	});

	return (
		<Card className="bg-card/40 border-2 border-card-border/40 shadow-sm w-full max-w-lg p-6 backdrop-blur-xl">
			<CardContent className="p-0 flex">
				{/* <div
					className={cn(
						"h-72 w-48 rounded-sm p-6",
						"flex flex-col justify-center gap-5",
						"bg-gradient-to-b from-[#B4FAF2] to-[#FFEE96]"
					)}
				>
					<Branding />
					<Separator />
					<div>
						<div className="text-lg font-semibold">Cited RAG</div>
						<p className="text-sm text-muted-foreground">
							Cited Generated Content
						</p>
					</div>
				</div> */}
				<div className="flex-1 flex flex-col space-y-4">
					<div className="flex flex-col w-full items-center gap-4">
						<div>
							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
								Your Secret
							</h4>
							<p className="text-sm text-muted-foreground">
								Your secret acts as your password. Make sure to keep it safe as
								you will need to enter it to login to your account
							</p>
						</div>
						<div className="w-full space-y-1">
							<Label htmlFor="passphrase" className="text-sm flex items-end">
								<div className="flex-1">Secret</div>
								<CopyToClipboardButton
									value={passphrase}
									size="sm"
									variant="ghost"
									className="inline-flex gap-1 items-center py-1 h-auto"
								>
									<Copy className="w-3 h-3" />
									<div className="text-xs font-semibold">Copy</div>
								</CopyToClipboardButton>
							</Label>
							<div
								className={cn(
									"flex-1 w-full rounded-md border-2 border-border/30 border-dashed bg-border/5",
									"grid grid-cols-2 sm:grid-cols-3 p-2 gap-2"
								)}
							>
								{passphrase.split(" ").map((word, i) => (
									<div
										key={i}
										className="text-center bg-border/20 text-foreground/40 rounded-sm p-1.5 text-xs font-semibold text-clip"
									>
										{word}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="flex-1" />
					<Button
						className="self-end gap-1 hover:gap-3 hover:pr-2 transition-all ease-out"
						onClick={props.actionButtonOnClick}
					>
						I have saved my secret
						<ArrowRight className="w-4 h-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
