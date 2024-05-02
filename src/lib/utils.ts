import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
	const [firstName, lastName] = name.split(" ");
	return (firstName?.charAt(0) || "") + (lastName?.charAt(0) || "");
}
