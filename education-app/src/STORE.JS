//temporary dummy API feed for client

export default [
	{
		id: 1234,
		username: "MorganStark",
		email: "morgan@abc.net",
		userType: "Student",
		assignments: [
			{
				id: 1,
				name: "Syllabus",
				className: "Math 101",
				dueDate: new Date(Date.UTC(2020, 3, 30, 11, 0, 0)),
				files: null,
			},
			{
				id: 2,
				name: "Math Drills",
				className: "Math 101",
				dueDate: new Date(Date.UTC(2020, 5, 5, 11, 0, 0)),
				files: null,
			},
		],
	},
	{
		id: 123456,
		username: "MariaHill",
		email: "MariaHill@abc.net",
		userType: "Teacher",
		className: "Math 101",
		assignments: [
			{
				id: 1,
				name: "Syllabus",
				dueDate: new Date(Date.UTC(2020, 3, 30, 11, 0, 0)),
				files: null,
				feedback: [
					{
						id: 12,
						username: "MorganStark",
						text: "Lorem ipsum",
					},
					{
						id: 13,
						username: "PeterParker4",
						text: "Sorry, forgot to do it",
					},
				],
			},
			{
				id: 2,
				name: "Math Drills",
				dueDate: new Date(Date.UTC(2020, 5, 5, 11, 0, 0)),
				files: null,
			},
		],
	},
];
