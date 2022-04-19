import { $api } from ".";

export const listSockets = async () => {
	try {
		const { data } = await $api.get(`config/sockets`);
		return data;
	} catch (err) {
		console.log("Error found while getting list of sockets:", err);
		return null;
	}
};

export const listSocketsByLocation = async (address) => {
	try {
		const { data } = await $api.get(`control?location=${address}`);
		return data;
	} catch (err) {
		console.log("Error found while getting sockets from locations:", err);
		return null;
	}
};

export const toggleSocket = async (id, turnOn) => {
	try {
		const { data } = await $api.post(`control`, {
			socketID: id,
			turnOn: turnOn,
		});
		return data;
	} catch (err) {
		console.log("Error found while toggling a socket:", err);
		return null;
	}
};
