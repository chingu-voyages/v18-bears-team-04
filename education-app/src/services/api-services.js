import config from "../config";

const ApiService = {
	getUsers() {
		return fetch(`${config.API_ENDPOINT}/user`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getUserName(userName) {
		return fetch(`${config.API_ENDPOINT}/user/${userName}`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	addUser(obj) {
		return fetch(`${config.API_ENDPOINT}/user`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(obj),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
};

export default ApiService;
