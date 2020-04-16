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
		assignmentGrades: [
			{
				assignmentName: "Polynomial Drills",
				studentUserName: "Steve Rogers",
				status: "Graded",
				grade: "A",
				studentComment: "Submitted late",
			},
			{
				assignmentName: "Polynomial Drills",
				studentUserName: "Annie Rogers",
				status: "Submitted",
				grade: null,
				studentComment: "Lorem Ipsum",
			},
			{
				assignmentName: "Polynomial Drills",
				studentUserName: "Bruce Banner",
				status: "Submitted",
				grade: null,
				studentComment: null,
			},
			{
				assignmentName: "Algebra Take Home Quiz #1",
				studentUserName: "Groot",
				status: "Graded",
				grade: "A",
				studentComment: "Submitted late",
			},
			{
				assignmentName: "Algebra Take Home Quiz #1",
				studentUserName: "Peter Parker",
				status: "Submitted",
				grade: null,
				studentComment: "Lorem Ipsum",
			},
			{
				assignmentName: "Algebra Take Home Quiz #1",
				studentUserName: "Clint Barton",
				status: "Submitted",
				grade: null,
				studentComment: "Lorem Ipsum",
			},
		],
	},
];
