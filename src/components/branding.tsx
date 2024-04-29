import Image from "next/image";
import React from "react";

export default function Branding() {
	return (
		<div>
			<Image
				src="/logo.svg"
				alt="Cited RAG Logo - left quote"
				width={40}
				height={40}
				className="w-10 h-10"
			/>
		</div>
	);
}
