import config from "../config";

const TokenService = {
	saveAuthToken(username) {
		window.localStorage.setItem(config.TOKEN_KEY, username);
	},
	getAuthToken() {
		return window.localStorage.getItem(config.TOKEN_KEY);
	},
	clearAuthToken() {
		window.localStorage.removeItem(config.TOKEN_KEY);
	},
	hasAuthToken() {
		//boolean
		return !!TokenService.getAuthToken();
	},
};

export default TokenService;
