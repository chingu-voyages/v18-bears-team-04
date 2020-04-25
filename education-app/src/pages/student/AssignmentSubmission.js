import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import config from "../../config";
import ValidationError from "../../components/ValidationError";
import SideNav from "../../components/SideNav";

import ApiService from "../../services/api-services";
// import TokenService from "../../services/token-service";

const AssignmentSubmission = (props) => {
	const initialFormState = {
		text: "",
		file: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [{ error }, setError] = useState({ error: null });

	const [assignment, setAssignment] = useState(null);
	const { text } = userInput;

	function getAssignment(props) {
		Promise.all([ApiService.getAssignments(), ApiService.getClasses()])
			.then((res) => {
				const currentAssignment = res[0].find(
					(a) => a._id === props.match.params.id
				);
				// const currClass = res[1].filter((a) =>
				// 	res[1].some((b) => a._id === b.classId)
				// );

				setAssignment(currentAssignment);
			})
			.catch((err) => setError({ error: err }));
	}

	useEffect(() => {
		getAssignment(props);
	}, [props]);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong.`;
		}
	};

	const handleSubmit = (e) => {
		//update
		e.preventDefault();

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

	const handleFileChange = (e) => {
		const { name } = e.target;
		e.preventDefault();

		setInput({ ...userInput, [name]: e.target.files[0] });
	};

	const stringURL =
		assignment !== null && assignment.teacherDocLink[0] !== undefined
			? config.DOC_BASE_URL + assignment.teacherDocLink[0]
			: null;

	const formatDate = () => {
		if (assignment.dueDate === null) {
			return "Due Date Unavailable";
		}
		return moment(assignment.startDate).format("MMMM Do YYYY, h:mm:ss a");
	};

	return (
		<>
			<SideNav />
			<AssignmentSubmissionStyle>
				<div className='wrap'>
					<h1>{assignment !== null && assignment.title}</h1>

					<div className='assignment-details'>
						<div className='instructions'>
							Instructions:
							<div className='instructions-container'>
								{assignment !== null
									? assignment.instructions
									: "Instructions Unavailable"}{" "}
							</div>
						</div>
						<div className='assignment-dates'>
							<div>
								Due Date:{" "}
								<span className='date-string'>
									{assignment !== null && formatDate()}
								</span>
							</div>
						</div>
					</div>
					{stringURL !== null && (
						<Link
							className='download-btn'
							to={stringURL}
							target='_blank'
							download
						>
							Download File
						</Link>
					)}

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
						<label htmlFor='files' className='upload-file-label'>
							<span className='upload-file-title'>Upload File</span>
							<input
								type='file'
								name='files'
								onChange={(e) => handleFileChange(e)}
							/>
						</label>
						{props.match.params.role === "student" && (
							<div className='btns'>
								(<button className='submit-btn'>SUBMIT</button>)
								{/* if user is a student they can't edit the assignment' */}
							</div>
						)}
						{error && <ValidationError message={errorMessage()} />}
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
	.assignment-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		margin-top: 10px;
	}

	.instructions {
		font-size: 2rem;
	}

	.assignment-dates {
		display: flex;
		justify-content: center;
		align-items: center;
		div {
			width: 100%;
			background-color: #888;
			line-height: 40px;
			width: 120px;
			text-align: center;
			font-size: 2rem;
			padding: 0px 10px 0px 10px;
			.date-string {
				display: block;
			}
		}
	}

	.instructions-container {
		width: 300px;
		margin: 10px;
		// overflow-y: scroll;
		height: 140px;
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
		.upload-file-label {
			display: block;
			width: 100%;
			padding: 5px;

			background-color: #c4c4c4;
			border-radius: 5px;
			span {
				font-size: 1.5rem;
				display: block;
				margin-bottom: 10px;
			}
		}
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
`;

export default AssignmentSubmission;
