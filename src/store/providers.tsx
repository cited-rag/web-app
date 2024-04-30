"use client";

import React, { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useAuthStore } from "./useAuthStore";
import { Toaster } from "@/components/ui/toaster";

type Props = {
	children: React.ReactNode;
};

export default function Providers(props: Props) {
	const queryClient = useRef(new QueryClient()).current;
	const token = getCookie("token");

	// Getting the setAuthentication function from the authentication store
	const setAuthentication = useAuthStore((state) => state.setAuthentication);

	// Running a side effect whenever the token value changes
	useEffect(() => {
		if (token) {
			setAuthentication(true); // Setting the authentication status to true if a token exists
		}
	}, [setAuthentication, token]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
			<Toaster />
		</>
	);
}
