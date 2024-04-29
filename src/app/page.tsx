import Branding from "@/components/branding";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<Card className="bg-card/40 border-2 border-card-border/40 shadow-sm w-full max-w-lg p-6 backdrop-blur-xl">
				<CardContent className="p-0 flex flex-row gap-5">
					<div
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
					</div>
					<div className="flex-1 flex flex-col space-y-4">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="name">Name</Label>
							<Input type="text" id="name" placeholder="John Doe" />
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="secret">Secret</Label>
							<Input type="password" id="secret" placeholder="Passphrase" />
						</div>
						<div className="flex-1" />
						<Button className="self-end gap-1 hover:gap-3 hover:pr-2 transition-all ease-out">
							Continue <ArrowRight className="w-4 h-4" />
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
