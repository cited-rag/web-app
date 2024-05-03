import Background from "@/components/background";
import Providers from "@/store/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cited RAG",
	description: "Get cited generated content",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Background />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
