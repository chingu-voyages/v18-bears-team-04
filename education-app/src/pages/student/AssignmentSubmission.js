import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import ApiService from "../../services/api-services";
import SideNav from "../../components/SideNav";

const AssignmentSubmission = (props) => {
	const initialFormState = {
		text: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [{ error }, setError] = useState({ error: null });

	const [assignment, setAssignment] = useState(null);
	const { text } = userInput;

	function getAssignment(props) {
		ApiService.getAssignments()
			.then((res) => {
				const currentAssignment = res.find(
					(a) => a._id === props.match.params.id
				);
				setAssignment(currentAssignment);
			})
			.catch((err) => setError({ error: err }));
	}

	useEffect(() => {
		getAssignment(props);
	}, [props]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userInput);

		ApiService.submitAssignment(
			userInput,
			props.match.params.id,
			"lewis"
		).then((res) => console.log(res));
	};

	const handleTextChange = (e) => {
		e.preventDefault();
		setInput({
			text: e.target.value,
		});
	};
	const stringURL =
		assignment !== null && assignment.teacherDocLink[0] !== undefined
			? assignment.teacherDocLink[0].toString()
			: "null";

	return (
		<>
			<SideNav />
			<AssignmentSubmissionStyle>
				<div className='wrap'>
					<h1>Assignment Submission</h1>
					<h2 className='assignment-title'>
						{assignment !== null && assignment.title}
					</h2>
					<Link
						className='download-btn'
						to={stringURL}
						target='_blank'
						download
					>
						Download File
					</Link>

					<form onSubmit={(e) => handleSubmit(e)}>
						<label htmlFor='submission'>
							<textarea
								className='text-area'
								name='text'
								value={text}
								placeholder='Write your submission here'
								onChange={(e) => handleTextChange(e)}
							/>
						</label>
						<div className='btns'>
							<button className='submit-btn'>SUBMIT</button>
							<button className='edit-btn' disabled={true}>
								EDIT
							</button>
							{/* if user is a student they can't edit the assignment' */}
						</div>
					</form>
				</div>
			</AssignmentSubmissionStyle>
		</>
	);
};

const AssignmentSubmissionStyle = styled.div`
	.wrap {
		padding-left: 250px;
		padding-top: 60px;
		width: 90vw;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}
	h1 {
		font-size: 4rem;
		color: #00a3ff;
		margin-top: 20px;
	}
	.assignment-title {
		font-size: 2.5rem;
		color: #5f5f5f;
		margin-top: 10px;
	}
	.download-btn {
		display: block;
		width: 200px;
		text-align: center;
		margin-top: 20px;
		padding: 10px;
		font-size: 1.6rem;
		background-color: #00a3ff;
		color: #fff;
	}
	form {
		width: 100%;
		textarea {
			margin-top: 40px;
			width: 100%;
			min-height: 250px;
			border-radius: 10px;
		}
		.btns {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			margin-top: 30px;
			.submit-btn,
			.edit-btn {
				width: 200px;
				height: 40px;
				font-size: 1.8rem;
				border-radius: 10px;
				background-color: #00a3ff;
				color: #fff;
			}
		}
	}
`;

export default AssignmentSubmission;
