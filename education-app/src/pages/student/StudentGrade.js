import React, { useState, useEffect } from "react";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

import SideNav from "../../components/SideNav";
// import ValidationError from "../components/ValidationError";

import styled from "styled-components";

const StudentGrade = (props) => {
	const [{ error }, setError] = useState({ error: null });
	const [assignments, setAssignments] = useState(null);
	// const [userInfo, setUser] = useState(null);
	const [selection, setSelection] = useState({});
	const [classInfo, setClasses] = useState(null);
	const userId = TokenService.getAuthToken();

	const getAllApiInfo = (props) => {
		Promise.all([
			ApiService.getClasses(),
			ApiService.getAssignments(),
			ApiService.getUserName(props.match.params.userName),
		])
			.then((res) => {
				if (res.length === 0) {
					setError({ error: `Looks like you don't have any assignments yet.` });
				}
				const filteredClasses = res[0].filter((a) =>
					res[1].some((b) => a._id === b.classId)
				);
				const filteredAssignments = res[1].filter((a) =>
					res[0].some((b) => a.classId === b._id)
				);

				// setUser(res[2]);
				setClasses(filteredClasses);
				setAssignments(filteredAssignments);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllApiInfo(props);
	}, [props]);

	const handleSelectionChange = (e) => {
		const value = e.target.value.split("+");

		const id = value[0];
		const title = value[1];
		setSelection({ title: title, id: id });
	};

	const combinedInfo =
		assignments != null &&
		assignments.map((a) => {
			for (let i = 0; i < classInfo.length; i++) {
				if (classInfo[i]._id === a.classId) {
					return { ...classInfo[i], ...a };
				}
			}
			return a;
		});

	const studentClass =
		assignments != null && classInfo.filter((a) => a.studentIds);

	const currentAssignments =
		assignments != null &&
		studentClass
			.filter((c) => c.studentIds.find((b) => b === userId))
			.map((a) => a._id)
			.map((a) => combinedInfo.filter((b) => b.classId === a));

	const makeCombinedAssignments = (currentAssignments) => {
		let list = [];
		for (let i = 0; i < currentAssignments.length; i++) {
			for (let x = 0; x < currentAssignments[i].length; x++) {
				list.push(currentAssignments[i][x]);
			}
		}

		return list;
	};

	const studentAssignments =
		assignments != null && makeCombinedAssignments(currentAssignments);

	const list = [];
	assignments != null &&
		studentAssignments.map((a) =>
			a.assignmentResults.forEach((b) =>
				list.push({
					...b,
					title: a.title,
					assignmentId: a._id,
					className: a.className,
				})
			)
		);

	const gradedAssignments =
		assignments != null &&
		list.filter((a) => a.studentId === userId && a.status === "GRADED");

	const assignmentSelection =
		assignments !== null &&
		gradedAssignments.map((a, index) => {
			return (
				<option key={index} value={a._id + "+" + a.title}>
					{a.title}
				</option>
			);
		});

	assignments != null && console.log(gradedAssignments);

	// temporary
	let score = 82;

	let scoreColor;
	if (score >= 90) {
		scoreColor = "#FF0000";
	} else if (score >= 80) {
		scoreColor = "#FF5C00";
	} else if (score >= 70) {
		scoreColor = "#FFD600";
	} else if (score >= 60) {
		scoreColor = "#17A300";
	} else {
		scoreColor = "#0057FF";
	}

	const renderedGrades =
		assignments !== null &&
		gradedAssignments
			.filter((a) => a.title === selection.title)
			.map((a, index) => {
				return (
					<>
						<div className='top'>
							<h3>Asignment Title - {a.title}</h3>
							<div className='status'>{a.status}</div>
						</div>
						<div className='your-score'>
							<h4>Score</h4>
							<div className='score'>{a.grade}</div>
						</div>
						<div className='feedback-from'>
							<h4>Feedback from the Teacher</h4>
							<p>{a.teacherFeedback}</p>
						</div>
						<div className='feedback-for'>
							<h4>Feedback for the Teacher</h4>
							<form>
								<textarea />
								<button className='submit-btn'>SUBMIT</button>
							</form>
						</div>
					</>
				);
			});

	return (
		<>
			<SideNav />
			<StudentGradeStyle scoreColor={scoreColor}>
				<div className='wrap'>
					<h2 className='page-title'>Assignment Grade</h2>
					<select onChange={(e) => handleSelectionChange(e)}>
						<option>Select Assignment</option>
						{assignmentSelection}
					</select>
					{renderedGrades}
				</div>
			</StudentGradeStyle>
		</>
	);
};

const StudentGradeStyle = styled.div`
	padding: 60px 0;
	padding-left: 250px;
	width: 100vw - 250px;
	height: 100%;
	margin-left: auto;
	.wrap {
		width: 90%;
		margin: 0 auto;
		color: #5f5f5f;
	}
	.page-title {
		font-size: 3.8rem;
		margin-top: 30px;
		color: #00a3ff;
	}
	h3 {
		font-size: 3rem;
		margin-top: 10px;
		color: #5e5e5e;
	}
	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		select {
			width: 200px;
		}
	}

	.your-score,
	.feedback-from,
	.feedback-for {
		margin-top: 40px;
		h4 {
			font-size: 2rem;
		}
	}

	.your-score {
		.score {
			width: 100px;
			height: 100px;
			margin-top: 10px;
			line-height: 100px;
			border-radius: 50%;
			text-align: center;
			font-size: 3.4rem;
			color: #fff;
			background-color: ${({ scoreColor }) => scoreColor};
		}
	}
	.feedback-from {
		width: 100%;
		p {
			height: 200px;
			margin-top: 10px;
			border: 1px solid #5f5f5f;
			border-radius: 10px;
			padding: 8px;
			font-size: 1.2rem;
		}
	}
	.feedback-for {
		width: 100%;
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 10px;
			textarea {
				width: 100%;
				padding: 8px;
				height: 200px;
				border: 1px solid #5f5f5f;
				border-radius: 10px;
				outline: 0;
			}
			.submit-btn {
				width: 200px;
				height: 40px;
				border-radius: 10px;
				margin-top: 20px;
				font-size: 2rem;
				color: #fff;
				background-color: #00a3ff;
			}
		}
	}
`;

export default StudentGrade;
