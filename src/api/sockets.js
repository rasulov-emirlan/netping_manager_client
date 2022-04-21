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

export const listSocketsByLocation = async (id) => {
	try {
		const { data } = await $api.get(`control/${id}`);
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

export const addSocket = async (mib, name, locationID, type) => {
	try {
		let payload = {
			locationID: locationID,
			socketName: name,
			socketType: type,
			socketMIB: mib,
		}
		console.log(payload)
		const { data } = await $api.post(`/config/socket`, payload);
		return data;
	} catch (err) {
		console.log("Error found while adding a new socket:", err);
		return null;
	}
};

export const deleteSocket = async (id) => {
	try {
		const { data } = await $api.delete(`/config/socket/${id}`);
		return data;
	} catch (err) {
		console.log("Error found while deleting an issue:", err);
		return null;
	}
};

export const updateSocket = async (id, name, socketType, socketMib) => {
	try {
		const { data } = await $api.delete(`/config/socket/${id}`, {
			name: name,
			snmpMib: socketMib,
			objectType: socketType,
		});
		return data;
	} catch (err) {
		console.log("Error found while deleting an issue:", err);
		return null;
	}
};
