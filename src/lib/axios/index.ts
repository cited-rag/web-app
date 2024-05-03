"use client";

import https from "https";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const agent = new https.Agent({
	rejectUnauthorized: false,
	requestCert: false,
});

// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	httpsAgent: agent,
});

instance.defaults.withCredentials = true;
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.data === "Invalid JWT") {
			console.log("Invalid JWT - Deleting token");
			deleteCookie("token");
			useAuthStore.getState().setUser(undefined);
			useAuthStore.getState().setAuthentication(false);
			throw new Error("Invalid Request");
		}
		throw error;
	}
);

instance.defaults.headers.common["Authorization"] = getCookie("token");
useAuthStore.subscribe((s) => {
	instance.defaults.headers.common["Authorization"] = getCookie("token");
});

export default instance;

// Alter defaults after instance has been created
