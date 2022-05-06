import { $api } from ".";

export const login = async (name, password) => {
	try {
		return await $api.post("/config/users/login", {
			username: name,
			password: password,
		});
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const logout = async () => {
	try {
		return await $api.post("/config/users/logout");
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

export const deleteUser = (userID) => {
	return $api.delete(`/config/users/${userID}`);
};
