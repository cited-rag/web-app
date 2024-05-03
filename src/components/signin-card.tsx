"use client";
import { getUsernameExists, signIn } from "@/lib/api/auth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Branding from "./branding";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useToast } from "@/components/ui/use-toast";
import GitHubButton from "react-github-btn";

export default function SignInCard() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const setAuthentication = useAuthStore((state) => state.setAuthentication);
	const [isUsernameInFocus, setIsUsernameInFocus] = useState(false);
	const throttledUsername = useDebounce(username, 500);
	const { toast } = useToast();

	const { data: doesUsernameExist } = useQuery({
		enabled: !!throttledUsername && !isUsernameInFocus,
		queryKey: ["usernameExists", throttledUsername],
		queryFn: getUsernameExists(throttledUsername),
		refetchInterval: false,
		refetchOnMount: false,
		retry: false,
	});

	const { refetch: signInAction } = useQuery({
		enabled: false,
		queryKey: ["signIn", username],
		queryFn: () => {
			return signIn(username, password)()
				.then(() => {
					console.log("Sign in successful");
					setAuthentication(true);
					router.replace("/");
					return true;
				})
				.catch(() => {
					toast({
						title: "Sign In Failed",
						description: "Please check your credentials and try again.",
					});
					setPassword("");
				});
		},
		refetchInterval: false,
		refetchOnMount: false,
		retry: false,
	});

	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password.length < 5) {
			toast({
				title: "Password too short",
				description: "Password should be at least 5 characters long.",
			});
			return;
		}
		signInAction();
	};

	return (
		<Card className="bg-card/40 border-2 border-card-border/40 shadow-sm w-full max-w-lg p-6 backdrop-blur-xl">
			<CardContent className="p-0 flex flex-row gap-5">
				<div
					className={cn(
						"h-72 w-48 rounded-sm p-4",
						"flex flex-col justify-center gap-5",
						"bg-gradient-to-b from-[#B4FAF2] to-[#FFEE96]"
					)}
				>
					<Branding />
					<Separator />
					<div className="flex-1">
						<div className="text-lg font-semibold">Cited RAG</div>
						<p className="text-sm text-muted-foreground">
							Cited Generated Content
						</p>
					</div>
					<div className="self-center">
						<GitHubButton
							href="https://github.com/cited-rag"
							data-color-scheme="no-preference: light; light: light; dark: dark;"
							data-size="large"
							aria-label="Follow @cited-rag on GitHub"
						>
							View on GitHub
						</GitHubButton>
					</div>
				</div>
				<div className="flex-1 flex flex-col space-y-5">
					<div>
						<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
							Hello there!
						</h4>
						<p className="text-sm text-muted-foreground">
							Sign in or create an account.
						</p>
					</div>
					<form
						className="flex-1 flex flex-col space-y-4"
						onSubmit={handleSubmit}
					>
						<>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label
									htmlFor="name"
									className="inline-flex items-center gap-1"
								>
									<div className="">Username</div>
									<div
										className={cn(
											"invisible transition-all",
											!isUsernameInFocus && doesUsernameExist && "visible"
										)}
									>
										<BadgeCheck className="h-4 w-4 stroke-primary-foreground fill-primary" />
									</div>
								</Label>
								<Input
									type="text"
									id="name"
									autoComplete="username"
									placeholder="John Doe"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									onFocus={() => setIsUsernameInFocus(true)}
									onBlur={() => setIsUsernameInFocus(false)}
								/>
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="secret">Password</Label>
								<Input
									type="password"
									id="secret"
									autoComplete="current-password"
									placeholder="Super Secret Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="flex-1" />
							<Button className="self-end gap-1 hover:gap-3 hover:pr-2 transition-all ease-out">
								{doesUsernameExist === undefined ||
								doesUsernameExist ||
								isUsernameInFocus
									? "Continue"
									: "Create Account"}
								<ArrowRight className="w-4 h-4" />
							</Button>
						</>
					</form>
				</div>
			</CardContent>
		</Card>
	);
}
