import axios from "axios";

export const basePath = "http://localhost:8080";

export const $api = axios.create({
	baseURL: basePath,
});
