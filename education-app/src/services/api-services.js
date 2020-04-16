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
	addClass(obj) {
		return fetch(`${config.API_ENDPOINT}/class`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(obj),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getClasses() {
		return fetch(`${config.API_ENDPOINT}/class`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getClassById(classId) {
		return fetch(`${config.API_ENDPOINT}/class/${classId}`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getAssignments() {
		return fetch(`${config.API_ENDPOINT}/assignment`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	addAssignment(obj) {
		return fetch(`${config.API_ENDPOINT}/assignment`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(obj),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getAssignmentById(assignmentId) {
		return fetch(
			`${config.API_ENDPOINT}/assignment/${assignmentId}`
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getAssignmentByUserId(userId) {
		return fetch(`${config.API_ENDPOINT}/assignment/${userId}`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	updateAssignmentById(obj, assignmentId) {
		return fetch(`${config.API_ENDPOINT}/assignment/${assignmentId}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(obj),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getGrades() {
		return fetch(`${config.API_ENDPOINT}/grade`).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	// router.delete("/:assignmentId", deleteSingleAssignmentById);
};

export default ApiService;
