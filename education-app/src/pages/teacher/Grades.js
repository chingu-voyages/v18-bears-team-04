import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SideNav from "../../components/SideNav";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

import styled from "styled-components";

const Grades = (props) => {
	//initialize state and all api pulls

	const infoObj = {
		users: [],
		classInfo: "",
		assignments: [],
	};
	const [apiInfo, setApiInfo] = useState({ infoObj });
	const [selection, setSelection] = useState({});
	const [error, setError] = useState({ error: null });
	const { users, classInfo, assignments } = apiInfo;

	const getAllApiInfo = () => {
		Promise.all([
			ApiService.getUsers(),
			ApiService.getClassById("5ea401ea13455e72b16c8b13"),
			//TokenService.getClassToken()
			ApiService.getAssignments(),
		])
			.then((res) =>
				setApiInfo({
					users: res[0],
					classInfo: res[1],
					assignments: res[2],
				})
			)
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllApiInfo();
	}, []);

	const filteredAssignments =
		assignments !== undefined &&
		assignments.filter((a) => a.classId === classInfo._id);

	const formattedAssignments =
		assignments !== undefined &&
		filteredAssignments.map((a) => ({
			title: a.title,
			assignmentResults: a.assignmentResults,
		}));

	const makeListWithTitles = (arr) => {
		const list = [];
		arr.map((a) =>
			a.assignmentResults.forEach((b) => list.push({ ...b, title: a.title }))
		);

		//make an array of assignment titles
		return list;
	};

	const assignmentListWithTitles =
		assignments !== undefined && makeListWithTitles(formattedAssignments);

	const displayedAssignments =
		assignments !== undefined &&
		assignmentListWithTitles.map(function (a) {
			let result = users.find((b) => a.studentId === b._id);
			a.studentUserName = result.userName;
			return a;
		});

	const filteredView =
		assignments !== undefined &&
		displayedAssignments.filter((a) => a.title === selection.value);

	assignments !== undefined && console.log(filteredView);

	const handleSelectionChange = (e) => {
		const { value } = e.target;
		setSelection({ value });
	};

	const assignmentSelection =
		assignments !== undefined &&
		filteredAssignments.map((a, index) => {
			return (
				<option key={index} value={a.title}>
					{a.title}
				</option>
			);
		});

	const displayedGrades =
		assignments !== undefined &&
		error !== null &&
		filteredView.map((s, index) => {
			if (s.status === "SUBMITTED" || s.status === "GRADED") {
				return (
					<tr key={index}>
						<td>{s.studentUserName}</td>
						<td>
							<span className='indicator-yes'>&#10004; </span>
						</td>

						<td>
							<label htmlFor='grade' className='grade-label'>
								{!s.grade ? (
									<input
										type='text'
										className='grade-selection'
										value={s.grade}
										disabled={true}
									/>
								) : (
									<input type='text' className='grade-selection' />
								)}
								/100
							</label>
							{!s.grade && (
								<button className='submit-grade-btn'>Submit Grade</button>
							)}
						</td>
						<td>
							<Link to={`/${s.userName}/assignment-view`}>
								<button className='view-assignment-btn' value={s.title}>
									View
								</button>
							</Link>
						</td>
						<td className='comment'>
							{!s.studentFeedback ? (
								" "
							) : (
								<span className='comment'>
									{" "}
									&#128681;
									<span className='comment-text'>{s.studentFeedback}</span>
								</span>
							)}
						</td>
					</tr>
				);
			}
			return (
				<tr key={index}>
					<td>{s.studentUserName}</td>

					<td>
						<span className='indicator-no'>&#10008; </span>
					</td>

					<td>
						<label htmlFor='grade' className='grade-label'>
							<input type='text' className='grade-selection' />
							/100
						</label>
						<button className='submit-grade-btn'>Submit Grade</button>
					</td>
					<td>
						<Link to={`/assignment-view`}>
							<button
								className='view-assignment-btn'
								value={s.title}
								disabled={true}
							>
								None
							</button>
						</Link>
					</td>
					<td className='comment'>
						{!s.studentFeedback ? (
							" "
						) : (
							<span className='comment'>
								{" "}
								&#128681;
								<span className='comment-text'>{s.studentFeedback}</span>
							</span>
						)}
					</td>
				</tr>
			);
		});

	return (
		<>
			<SideNav />
			<GradesStyle>
				<div className='grades-container'>
					<div className='title-section'>
						<h1 className='text'>Assignment Grades</h1>
						<p className='selection-text'> View By Assignment</p>

						<select
							className='assignment-selection'
							onChange={(e) => handleSelectionChange(e)}
						>
							<option>Pick An Assignment</option>
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
		</>
	);
};

const GradesStyle = styled.div`
	.grades-container {
		padding-top: 60px;
		padding-left: 275px;
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

	label {
		display: block;
		position: relative;
		bottom: 5px;
		font-size: 2rem;
		input {
			width: 50px;
		}
	}
	.submit-grade-btn:hover {
		color: green;
		cursor: pointer;
	}
`;

export default Grades;
