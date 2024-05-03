import Image from "next/image";
import React from "react";

type Props = {
	showName?: boolean;
};

export default function Branding(props: Props) {
	return (
		<div className="inline-flex items-center gap-2">
			<Image
				src="/logo.svg"
				alt="Cited RAG Logo"
				width={24}
				height={24}
				className="w-7 h-7"
			/>
			{props.showName && <div className="text-lg font-semibold">Cited RAG</div>}
		</div>
	);
}
