import axios from "@/lib/axios";
import { setCookie } from "cookies-next";

export function getUsernameExists(username: string): () => Promise<boolean> {
	return async () => {
		console.log("username", username);
		const response = await axios.post(`/auth/name`, { name: username });

		if (response.status >= 200 && response.status < 300) {
			return response.data.response as boolean;
		}

		return false;
	};
}

export function signIn(
	username: string,
	password: string
): () => Promise<string> {
	return async () => {
		console.log("signin", username, password);
		const response = await axios.post(`/auth/login`, {
			name: username,
			password,
		});
		if (response.status >= 200 && response.status < 300) {
			setCookie("token", response.data.jwt, {
				expires: new Date(new Date().setDate(new Date().getDate() + 7)),
				secure: true,
			});
			return response.data.jwt as string;
		}

		throw new Error("Invalid credentials");
	};
}
