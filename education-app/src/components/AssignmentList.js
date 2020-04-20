import React, { useState, useEffect } from "react";

import ApiService from "../services/api-services";
import styled from "styled-components";

const AssignmentList = (props) => {
	//Add get array of user Assignments & Class Ids
	//Match classIds to class name

	const [{ error }, setError] = useState({ error: false });
	const [assignments, setAssignments] = useState(null);
	const [classInfo, setClasses] = useState(null);

	const getAllApiInfo = () => {
		Promise.all([ApiService.getClasses(), ApiService.getAssignments()])
			.then((res) => {
				console.log(res[0], res[1]);
				const filteredClasses = res[0].filter((a) =>
					res[1].some((b) => a._id === b.classId)
				);
				const filteredAssignments = res[1].filter((a) =>
					res[0].some((b) => a.classId === b._id)
				);
				setClasses(filteredClasses);
				setAssignments(filteredAssignments);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllApiInfo();
	}, []);

	const displayedAssignments =
		assignments != null &&
		assignments.map((assign) => {
			return (
				<div key={assign._id} className='assignment'>
					<h4 className='assignment-title'>{assign.title}</h4>
				</div>
			);
		});

	console.log(displayedAssignments);

	return (
		<AssignmentListStyle>
			<div className='wrap'>
				<h2 className='page-title'>Assignments List</h2>
				<h3>Your Assignments</h3>
				<div className='assignment-table'>{displayedAssignments}</div>
			</div>
		</AssignmentListStyle>
	);
};

const AssignmentListStyle = styled.main`
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
	.assignment-table {
		width: 100%;
		margin-top: 40px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.assignment {
			width: 45%;
			background-color: #fff;
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
				position: absolute;
				color: #5e5e5e;
				top: 10%;
				left: 5%;
				font-size: 2rem;
			}
		}
	}
`;

export default AssignmentList;
