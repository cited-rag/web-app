"use client";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "./ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";

type Props = {
	value: string;
	children: ReactNode;
} & ButtonProps;

export default function CopyToClipboardButton({
	value,
	children,
	...buttonProps
}: Props) {
	const [copiedText, copyToClipboard] = useCopyToClipboard();

	return (
		<Button {...buttonProps} onClick={() => copyToClipboard(value)}>
			{children}
		</Button>
	);
}
