import React, { useState, useEffect } from "react";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

import SideNav from "../../components/SideNav";
import ValidationError from "../../components/ValidationError";

import styled from "styled-components";

const StudentGrade = (props) => {
	const [{ error }, setError] = useState({ error: null });
	const [gradedAssignments, setGradedAssignments] = useState(null);
	const [feedback, setFeedback] = useState({});
	const [selection, setSelection] = useState({
		title: "Select Assignment",
		id: "",
	});
	const userId = TokenService.getAuthToken();

	const getAllApiInfo = (props) => {
		const assignmentId = props.match.params.assignmentId;
		const userId = TokenService.getAuthToken();
		Promise.all([
			ApiService.getClasses(),
			ApiService.getAssignments(),
			ApiService.getUserName(props.match.params.userName),
		])
			.then((res) => {
				if (res.length === 0) {
					setError({ error: `Looks like you don't have any assignments yet.` });
				}

				if (assignmentId) {
					setSelection({ id: assignmentId });
				}

				const filteredClasses = res[0].filter((a) =>
					res[1].some((b) => a._id === b.classId)
				);

				const filteredAssignments = res[1].filter((a) =>
					res[0].some((b) => a.classId === b._id)
				);

				const combinedInfo = filteredAssignments.map((a) => {
					for (let i = 0; i < filteredClasses.length; i++) {
						if (filteredClasses[i]._id === a.classId) {
							return { ...filteredClasses[i], ...a };
						}
					}
					return a;
				});

				const currentAssignments = filteredClasses
					.filter((a) => a.studentIds)
					.filter((c) => c.studentIds.find((b) => b === userId))
					.map((a) => a._id)
					.map((a) => combinedInfo.filter((b) => b.classId === a));

				let list = [];
				let assignmentList = [];

				//combine lists and keys
				for (let i = 0; i < currentAssignments.length; i++) {
					for (let x = 0; x < currentAssignments[i].length; x++) {
						list.push(currentAssignments[i][x]);
					}
				}

				// //make a list based on assignment results
				list.map((a) =>
					a.assignmentResults.forEach((b) =>
						assignmentList.push({
							...b,
							title: a.title,
							assignmentId: a._id,
							className: a.className,
						})
					)
				);

				//list specific to this user
				const filteredList = assignmentList.filter(
					(a) => a.studentId === userId && a.status === "GRADED"
				);

				setGradedAssignments(filteredList);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllApiInfo(props);
	}, [props]);

	const updateScoreColor = (score) => {
		let scoreColor;
		if (score >= 90) {
			scoreColor = "#FFD600";
		} else if (score >= 80) {
			scoreColor = "#FF5C00";
		} else if (score >= 70) {
			scoreColor = "#FFD600";
		} else if (score >= 60) {
			scoreColor = "#17A300";
		} else {
			scoreColor = "#0057FF";
		}
		return scoreColor;
	};

	const handleSelectionChange = (e) => {
		const value = e.target.value.split("+");

		const id = value[0];
		const title = value[1];
		setSelection({ title: title, id: id });
	};

	const handleFeedbackChange = (e) => {
		const { value } = e.target;
		const values = [...gradedAssignments];
		console.log(selection.id);
		let newList = values.map((item) => {
			if (item.assignmentId === selection.id) {
				item.studentFeedback = value;
			}
			return item;
		});
		setGradedAssignments(newList);
	};

	const handleSubmitFeedback = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const assignmentToUpdate = gradedAssignments.find(
			(a) => a.assignmentId === selection.id
		);

		const assignmentObj = {
			studentFeedback: assignmentToUpdate.studentFeedback,
			assignmentId: selection.id,
			studentId: userId,
		};

		ApiService.addStudentFeedback(assignmentObj).then((res) => {
			props.history.push(`/${props.match.params.userName}/assignments`);
		});
	};

	//For Drop Down List
	const assignmentSelection =
		gradedAssignments !== null &&
		gradedAssignments.map((a, index) => {
			return (
				<option key={index} value={a.assignmentId + "+" + a.title}>
					{a.title}
				</option>
			);
		});

	const errorMessage = () => {
		if (error != null) {
			error.toString();
			return error.toString();
		}
	};

	const gradesToRender =
		gradedAssignments !== null &&
		gradedAssignments
			.filter((a) => a.assignmentId === selection.id)
			.map((a, index) => {
				return (
					<div key={a.assignmentId}>
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
							<form onSubmit={(e) => handleSubmitFeedback(e)}>
								{a.studentFeedback ? (
									<>
										<textarea
											value={a.studentFeedback}
											name={feedback}
											onChange={(e) => handleFeedbackChange(e)}
										/>
										<button className='submit-btn'>SUBMIT</button>
									</>
								) : (
									<>
										<textarea
											name={feedback}
											onChange={(e) => handleFeedbackChange(e)}
										/>
										<button className='submit-btn'>SUBMIT</button>
									</>
								)}
							</form>
						</div>
					</div>
				);
			});

	//Setting conditional grade color
	const gradeToColor =
		gradedAssignments !== null &&
		gradedAssignments.find((a) => a.assignmentId === selection.id);

	const scoreColor =
		gradeToColor !== undefined && updateScoreColor(gradeToColor.grade);

	return (
		<>
			<SideNav />
			<StudentGradeStyle scoreColor={scoreColor}>
				<div className='wrap'>
					<h2 className='page-title'>Assignment Grade</h2>
					<ValidationError message={errorMessage()} />

					<select onChange={(e) => handleSelectionChange(e)}>
						<option> Select An Assignment</option>
						{assignmentSelection}
					</select>

					{gradesToRender}
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
		color: #5e5e5e;
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
			border: 1px solid #5e5e5e;
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
				border: 1px solid #5e5e5e;
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
			.submit-btn:hover {
				cursor: pointer;
			}
		}
	}
`;

export default StudentGrade;
