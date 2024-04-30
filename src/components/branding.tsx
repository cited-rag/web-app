import Image from "next/image";
import React from "react";

type Props = {
	showName?: boolean;
};

export default function Branding(props: Props) {
	return (
		<div className="inline-flex items-center">
			<Image
				src="/logo.svg"
				alt="Cited RAG Logo"
				width={40}
				height={40}
				className="w-10 h-10"
			/>
			{props.showName && <div className="text-lg font-semibold">Cited RAG</div>}
		</div>
	);
}
