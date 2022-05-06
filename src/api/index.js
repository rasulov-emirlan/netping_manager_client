import axios from "axios";

export const basePath = "http://localhost:8080/api";

export const $api = axios.create({
	baseURL: basePath,
});

export const setInterceptors = (token) => {
	$api.interceptors.request.use((config) => {
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
};
