import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

import SideNav from "../components/SideNav";
import ValidationError from "../components/ValidationError";
import styled from "styled-components";

const AssignmentList = (props) => {
	const [{ error }, setError] = useState({ error: null });
	const [assignments, setAssignments] = useState(null);
	const [userInfo, setUser] = useState(null);
	const [classInfo, setClasses] = useState(null);
	const classId = TokenService.getClassToken();
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

				setUser(res[2]);
				setClasses(filteredClasses);
				setAssignments(filteredAssignments);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllApiInfo(props);
	}, [props]);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong.`;
		}
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

	//Display only for teachers
	const teacherAssignments =
		assignments != null &&
		combinedInfo.filter((a) => a.classId === TokenService.getClassToken());

	//Display for students only

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

	const renderSubmittedInfo = (str) => {
		if (str === "NOT SUBMITTED") {
			return (
				<div className='status-container'>
					<p className='status no'>&#10008;</p>
				</div>
			);
		}
		return (
			<div className='status-container'>
				<p className='status yes'>&#10003;</p>
			</div>
		);
	};

	// Map for render - TEACHERS

	const displayedTeacherAssignments =
		assignments != null
			? teacherAssignments.map((assign, index) => {
					return (
						<div key={assign._id} className='assignment'>
							<Link to={`/${assign.title}/${assign._id}/assignment`}>
								<h4 className='assignment-title'>{assign.title}</h4>
								<div
									key={index}
									className='class-name-container teacher-class-name'
								>
									<p className='class-name'>{assign.className}</p>
								</div>
							</Link>
						</div>
					);
			  })
			: null;

	// Get Assignments Submitted By Student

	const list = [];
	assignments != null &&
		studentAssignments.map((a) =>
			a.assignmentResults.forEach((b) =>
				list.push({
					...b,
					title: a.title,
					assignmentId: a.assignmentId,
					className: a.className,
				})
			)
		);

	const studentCurrentAssignments =
		assignments != null && list.filter((a) => a.studentId === userId);

	const displayedStudentAssignments =
		assignments != null
			? studentCurrentAssignments.map((assign, index) => {
					return (
						<div key={assign._id} className='assignment'>
							<Link
								to={`/${assign.title}/${assign._id}/${userInfo.role}/submission`}
							>
								<h4 className='assignment-title'>{assign.title}</h4>
								<div key={index} className='class-name-container'>
									<p className='class-name'>{assign.className}</p>
									{renderSubmittedInfo(assign.status)}
								</div>
							</Link>
						</div>
					);
			  })
			: null;

	return (
		<>
			<SideNav />
			<AssignmentListStyle>
				<div className='wrap'>
					<h2 className='page-title'>Assignments List</h2>
					<h3>Your Assignments</h3>
					{error !== null && <ValidationError message={errorMessage()} />}
					{classId === null ? (
						<div className='assignment-table'>
							{displayedStudentAssignments}
						</div>
					) : (
						<div className='assignment-table'>
							{displayedTeacherAssignments}
						</div>
					)}
				</div>
			</AssignmentListStyle>
		</>
	);
};

const AssignmentListStyle = styled.div`
	padding-left: 250px;
	padding-top: 60px;
	width: 90vw;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
	.wrap {
		width: 90%;
		margin: 0 auto;
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

	.status {
		display: flex;
		border: 1px solid black;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		width: 75px;
		height: 75px;
		font-size: 3rem;
		color: white;
		position: relative;
		bottom: 30%;
	}
	.no {
		background-color: red;
	}
	.yes {
		background-color: green;
	}
	.assignment-table {
		width: 100%;
		margin-top: 40px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.assignment {
			width: 45%;
			// background-color: #ffffff;
			margin-bottom: 20px;
			border-radius: 10px;
			position: relative;
			box-shadow: 0 5px 20px #0000001f;

			&:before {
				content: "";
				display: block;
				margin-top: 30%;
			}
			.assignment-title {
				width: 100%;
				height: 100%;
				position: absolute;
				color: #5e5e5e;
				top: 10%;
				left: 5%;
				font-size: 2.75rem;
			}
			.class-name-container {
				display: flex;
				justify-content: space-around;
				// margin: 0px 20px 20px;
			}
			.class-name {
				width: 150px;
				height: 50px;
				text-align: center;
				font-size: 2rem;
				border: 1px solid black;
				border-radius: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.teacher-class-name {
		position: relative;
		bottom: 20px;
	}
`;

export default AssignmentList;
