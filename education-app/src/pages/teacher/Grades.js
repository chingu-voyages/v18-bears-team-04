import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import STORE from "../../STORE";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

import styled from "styled-components";

const Grades = (props) => {
	//initialize state and all api pulls

	const infoObj = {
		users: [],
		grades: [],
		classes: [],
		assignments: [],
	};
	const [apiInfo, setApiInfo] = useState({ infoObj });
	const [selection, setSelection] = useState({});
	const { users, grades, classes, assignments } = apiInfo;
	//temporary
	const gradesList = STORE[1].assignmentGrades;
	const filteredGrades = gradesList.filter(
		(a) => a.assignmentName === selection.value
	);
	//if assignment is part of the class - pull the assignment and make a list
	//fetch - get all assignments created by teacher

	const getAllApiInfo = () => {
		Promise.all([
			ApiService.getClasses(),
			ApiService.getUsers(),
			ApiService.getGrades(),
			ApiService.getAssignments(),
		]).then((res) =>
			setApiInfo({
				users: res[1],
				grades: res[2].grades,
				classes: res[0],
				assignments: res[3],
			})
		);
	};

	useEffect(() => {
		getAllApiInfo();
	}, []);

	// const titles = assignment
	// 	.filter((i) => grades.some((k) => k.assignmentId === i._id))
	// 	.map((a) => a.title);

	const handleSelectionChange = (e) => {
		const { value } = e.target;
		setSelection({ value });
	};

	console.log(users, classes, grades, assignments);

	//teachername to classid, classid to assignment

	// const filteredAssignments =
	// 	assignments != null
	// 		? assignments.map((a) => a.classId === TokenService.getClassToken())
	// 		: null;
	// console.log(TokenService.getClassToken());

	const assignmentSelection = //need to change to filter out by classId
		assignments != null
			? assignments.map((a) => (
					<option key={a._id} value={a.title}>
						{a.title}
					</option>
			  ))
			: " ";

	const displayedGrades = filteredGrades.map((s) => {
		if (s.status === "Submitted") {
			return (
				<tr key={s.studentUserName}>
					<td>{s.studentUserName}</td>
					<td>
						<span className='indicator-no'>&#10008; </span>
					</td>
					<td>
						<select className='grade-selection'>
							<option value='A'>A</option>
							<option value='B'>By</option>
							<option value='C'>C</option>
							<option value='D'>D</option>
							<option value='F'>F</option>
						</select>
					</td>
					<td>
						<button className='view-assignment-btn' value={s.assignmentName}>
							<Link to={`/:studentUsername/assignment-view`}>View</Link>
						</button>
					</td>
					<td className='comment'>
						{!s.studentComment ? (
							" "
						) : (
							<span className='comment'>
								{" "}
								&#128681;
								<span className='comment-text'>{s.studentComment}</span>
							</span>
						)}
					</td>
				</tr>
			);
		}
		return (
			<tr key={s.studentUserName}>
				<td>{s.studentUserName}</td>
				<td>
					<span className='indicator-yes'>&#10004; </span>
				</td>
				<td>
					<span className='completed-grade'>{s.grade}</span>
				</td>
				<td>
					<button className='view-assignment-btn' value={s.assignmentName}>
						View
					</button>
				</td>
				<td className='comment'>
					{!s.studentComment ? (
						" "
					) : (
						<span className='comment'>
							{" "}
							&#128681;
							<span className='comment-text'>{s.studentComment}</span>
						</span>
					)}
				</td>
			</tr>
		);
	});

	return (
		<GradesStyle>
			<div className='grades-container'>
				<div className='title-section'>
					<h1 className='text'>Assignment Grades</h1>
					<p className='selection-text'> Select By Assignment</p>
					<select
						className='assignment-selection'
						onChange={(e) => handleSelectionChange(e)}
					>
						{assignmentSelection}
					</select>
				</div>
				<div className='grade-display'>
					<table>
						<tbody>
							<tr className='grade-section-titles'>
								<th>Name</th>
								<th>Status</th>
								<th>Grade</th>
								<th>Submission</th>
								<th>Student Comment</th>
							</tr>

							{displayedGrades}
						</tbody>
					</table>
				</div>
			</div>
		</GradesStyle>
	);
};

const GradesStyle = styled.div`
	.grades-container {
		padding-top: 60px;
	}
	.container {
		padding-top: 60px;
	}
	.title-section {
		margin: 20px;
		font-size: 4rem;
		grid-row-start: 1;
		grid-row-end: 1;
		grid-column-start: 2;
		grid-column-end: 6;
	}
	.title-section,
	.grade-display {
		margin-left: 275px;
	}
	h1 {
		font-size: 4rem;
		color: #00a3ff;
	}
	.selection-text {
		font-size: 2rem;
		margin-top: 20px;
	}
	.side-nav {
		grid-column-start: 1;
		grid-column-end: 2;
	}
	.grade-display {
		display: flex;
		width: 75vw;
		border: 1px solid #a9a9a9;
		box-shadow: 3px 3px 5px #888888;
		justify-content: space-evenly;
		flex-direction: column;
	}
	tbody {
		border-collapse: collapse;
		width: 80%;
		margin: 0 auto;
	}
	.grade-section-titles {
		font-size: 4rem;
	}
	td,
	th {
		text-align: center;
		padding: 8px;
		font-size: 3rem;
	}
	td {
		font-size: 2rem;
	}
	.indicator-no {
		color: red;
		font-size: 3rem;
	}
	.indicator-yes {
		color: green;
		font-size: 3rem;
	}
	.comment {
		color: orange;
		font-size: 3rem;
	}
	.grade-selection,
	.assignment-selection {
		font-size: 2rem;
	}

	.completed-grade {
		color: #a9a9a9;
		font-size: 2rem;
	}
	.selection-text {
		margin-right: 40px;
		display: inline-block;
	}
	.view-assignment-btn {
		width: 100px;
		height: 40px;
		border-radius: 15px;
		font-size: 2rem;
		color: #ffffff;
		background-color: #00a3ff;
	}
	.view-assignment-btn:hover {
		cursor: pointer;
		box-shadow: 1px 2px 3px #888888;
	}
	.comment:hover {
		cursor: pointer;
	}
	.comment .comment-text {
		visibility: hidden;
		width: 200px;
		background-color: #00a3ff;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;
		position: absolute;
		z-index: 1;
	}
	.comment:hover .comment-text {
		visibility: visible;
	}
`;

export default Grades;
