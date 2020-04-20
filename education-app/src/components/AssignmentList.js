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
		//refactor to get assignments by userId
		Promise.all([ApiService.getClasses(), ApiService.getAssignments()])
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
				setClasses(filteredClasses);
				setAssignments(filteredAssignments);
			})
			.catch((err) => setError({ error: err }));
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

	useEffect(() => {
		getAllApiInfo();
	}, []);

	const renderSubmittedInfo = (bool) => {
		if (!bool) {
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

	const displayedAssignments =
		assignments != null
			? combinedInfo.map((assign, index) => {
					return (
						<div key={assign._id} className='assignment'>
							<h4 className='assignment-title'>{assign.title}</h4>
							<div key={index} className='class-name-container'>
								<p className='class-name'>{assign.className}</p>
								{renderSubmittedInfo(assign.submitted)}
							</div>
						</div>
					);
			  })
			: null;

	console.log(combinedInfo);

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
				position: absolute;
				color: #5e5e5e;
				top: 10%;
				left: 5%;
				font-size: 4rem;
			}
			.class-name-container {
				display: flex;
				justify-content: space-around;
				// margin: 0px 20px 20px;
			}
			.class-name {
				width: 150px;
				height: 50px;
				font-size: 2.5rem;
				border: 1px solid black;
				border-radius: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
`;

export default AssignmentList;
