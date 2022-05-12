import { $api } from ".";

export const login = async (name, password) => {
	try {
		return await $api.post(
			"/config/users/login",
			{
				username: name,
				password: password,
			},
			{ withCredentials: true }
		);
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const refresh = async () => {
	return $api.post("config/users/refresh", {}, { withCredentials: true });
};

export const logout = async () => {
	try {
		return await $api.post(
			"/config/users/logout",
			{},
			{ withCredentials: true }
		);
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const listUsers = () => {
	return $api.get("/config/users");
};

export const registerUser = (username, password) => {
	return $api.post("/config/users", {
		username: username,
		password: password,
	});
};

export const updateUser = (id, username, password, isAdmin) => {
	return $api.patch(`/config/users/${id}`, {
		username: username,
		password: password,
		isAdmin: isAdmin,
	});
};

export const deleteUser = (userID) => {
	return $api.delete(`/config/users/${userID}`);
};
