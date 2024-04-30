import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.defaults.withCredentials = true;

export default instance;

// Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = useAuthStore.getState().user.token;
