import { useAuthStore } from '@/store/useAuthStore';
import { getCookie } from 'cookies-next';
import io from 'socket.io-client';

const base_uri = process.env.NEXT_PUBLIC_API_BASE_URL;

export const socket = io(`${base_uri}`, {
	autoConnect: false,
	reconnection: true,
	reconnectionAttempts: 3,
	reconnectionDelay: 1000,
	extraHeaders: {
		Authorization: getCookie('token') ?? '',
	},
});

useAuthStore.subscribe(() => {
	socket.io.opts.extraHeaders!.Authorization = getCookie('token') ?? '';
});

export default socket;
