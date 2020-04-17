import config from "../config";

const TokenService = {
	saveAuthToken(userId) {
		window.localStorage.setItem(config.TOKEN_KEY, userId);
	},
	saveClassToken(classId) {
		window.localStorage.setItem(config.CLASS_TOKEN_KEY, classId);
	},
	getAuthToken() {
		return window.localStorage.getItem(config.TOKEN_KEY);
	},
	getClassToken() {
		return window.localStorage.getItem(config.CLASS_TOKEN_KEY);
	},
	clearClassToken() {
		return window.localStorage.removeItem(config.CLASS_TOKEN_KEY);
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
