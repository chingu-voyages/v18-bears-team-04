import config from "../config";

const ApiService = {
	getUsers() {
		return fetch(`${config.API_ENDPOINT}/user`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
};

export default ApiService;
