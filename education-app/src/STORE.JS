//temporary dummy API feed for client

export default {
	users: [
		{
			username: "MorganStark",
			email: "morgan@abc.net",
			userType: "Student",
		},
		{
			username: "NickFury123",
			email: "nickfury@abc.net",
			userType: "Teacher",
		},
	],
	assignments: [
		{
			id: 1,
			name: "Syllabus",
			class_name: "Math 101",
			due_date: new Date(Date.UTC(2020, 3, 30, 11, 0, 0)),
			files: null,
		},
		{
			id: 2,
			name: "Math Drills",
			class_name: "Math 101",
			due_date: new Date(Date.UTC(2020, 5, 5, 11, 0, 0)),
			files: null,
		},
	],
};
