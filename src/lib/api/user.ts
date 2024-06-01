import axios from "@/lib/axios";
import { ChatMetadata, User } from "@/types";

export function deleteUser() {
	return async () => {
		return async () => {
			const response = await axios.delete(`/user`);

			if (response.status >= 200 && response.status < 300) {
				return true;
			}

			throw new Error("Failed to delete user");
		};
	};
}

export function getUserDetails() {
	return async () => {
		const response = await axios.post<User>(`/user/me`);

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to fetch user details");
	};
}

export function getUserChats() {
	return async () => {
		const response = await axios.post<ChatMetadata[]>(`/user/chats`);

		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}

		throw new Error("Failed to fetch chats");
	};
}
