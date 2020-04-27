import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import config from "../../config";
import ValidationError from "../../components/ValidationError";
import SideNav from "../../components/SideNav";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

const AssignmentSubmission = (props) => {
	// TO DO: Download file from download button
	const [userInput, setInput] = useState({
		studentAnswers: "",
		studentFeedback: "",
	});
	const [{ error }, setError] = useState({ error: null });
	const [user, setUser] = useState(null);
	const [file, setFile] = useState({});
	const [assignment, setAssignment] = useState(null);
	const { studentAnswers, studentFeedback } = userInput;
	const history = useHistory();

	function getAssignment(props) {
		Promise.all([
			ApiService.getAssignments(),
			ApiService.getClasses(),
			ApiService.getUsers(),
		])
			.then((res) => {
				const newLocal = (a) => a._id === props.match.params.assignmentId;
				const currentAssignment = res[0].find(newLocal);

				const getUser = (a) => a._id === TokenService.getAuthToken();
				const currentUser = res[2].find(getUser);

				const assignmentContent = currentAssignment.assignmentResults.find(
					(a) => a.studentId === currentUser._id
				);

				setInput(assignmentContent);

				setUser(currentUser);
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

	// Teacher Delete
	const handleDelete = () => {
		ApiService.deleteAssignmentById(
			props.match.params.assignmentId
		).then((res) => props.history.goBack());
	};

	//FOR STUDENT SUBMISSION START//
	const handleTextChange = (e) => {
		e.preventDefault();
		const { value, name } = e.target;

		setInput({ ...userInput, [name]: value });
	};

	const handleSubmit = (e) => {
		//refactor
		e.preventDefault();

		const obj = {
			studentFeedback,
			studentAnswers,
			studentId: user._id,
			assignmentId: assignment._id,
		};

		ApiService.submitAssignment(obj).then((res) => props.history.goBack());
	};

	//FOR STUDENT SUBMISSION END//

	// TO DO: Upload a file - need upload route for student submission in API
	const handleFileChange = (e) => {
		e.preventDefault();

		setFile(e.target.files[0]);
	};

	const assignmentResult =
		assignment !== null && assignment.assignmentResults !== undefined
			? assignment.assignmentResults.find((a) => a.studentId === user._id)
			: null;

	const stringURL =
		assignment !== null && assignment.teacherDocLink.length > 0
			? config.DOC_BASE_URL + assignment.teacherDocLink[0]
			: null;

	const formatDate = () => {
		if (assignment.dueDate === null) {
			return "Due Date Unavailable";
		}
		return moment(assignment.startDate).format("MMMM DD, YYYY");
	};

	const renderStudentSubmissionView = assignment !== null &&
		user.role === "student" && (
			<>
				<h1> {assignment.title}</h1>

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
						<h2>Type Answers or Upload a File Below</h2>
						<textarea
							className='text-area'
							name='studentAnswers'
							value={studentAnswers}
							placeholder='Write your submission here'
							onChange={(e) => handleTextChange(e)}
						/>
					</label>

					<label htmlFor='feedback'>
						<h2>Feedback</h2>
						<textarea
							className='feedback'
							name='studentFeedback'
							value={studentFeedback}
							placeholder='Feedback details '
							onChange={(e) => handleTextChange(e)}
						/>
					</label>

					<label htmlFor='files' className='upload-file-label'>
						<span className='upload-file-title'>Upload File</span>
						<input
							type='file'
							name='file'
							onChange={(e) => handleFileChange(e)}
						/>
					</label>
					{user !== null &&
					user.role === "student" &&
					props.match.params.status === "GRADED" ? (
						<div className='graded-class-message'>Class is already graded.</div>
					) : (
						<div className='btns'>
							<Link
								to={`/${props.match.params.title}/${props.match.params.assignmentId}/${user.role}/edit-assignment`}
							>
								<button className='edit-btn'>EDIT</button>
							</Link>
							<button className='submit-btn'>SUBMIT</button>
						</div>
					)}

					{error && <ValidationError message={errorMessage()} />}
				</form>
			</>
		);

	const renderTeacherSubmissionView = assignment !== null &&
		user.role === "student" && (
			<>
				{" "}
				<h1> assignment.title</h1>
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
							placeholder='Write your submission here'
							onChange={(e) => handleTextChange(e)}
						/>
					</label>
					<label htmlFor='files' className='upload-file-label'>
						<span className='upload-file-title'>Upload File</span>
						<input
							type='file'
							name='file'
							onChange={(e) => handleFileChange(e)}
						/>
					</label>

					{error && <ValidationError message={errorMessage()} />}
				</form>
				{user !== null && user.role === "teacher" && (
					<div className='btns'>
						<button className='delete-btn' onClick={() => handleDelete()}>
							DELETE
						</button>
						<Link
							to={`/${props.match.params.title}/${props.match.params.assignmentId}/${user.role}/edit-assignment`}
						>
							<button className='edit-btn'>EDIT</button>
						</Link>
					</div>
				)}
			</>
		);

	return (
		<>
			<SideNav />
			<AssignmentSubmissionStyle>
				<div className='wrap'>
					{user !== null && user.role === "student"
						? renderStudentSubmissionView
						: renderTeacherSubmissionView}
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

	h2 {
		font-size: 1.75rem;
		color: #00a3ff;
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
			width: 200px;
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
	.feedback {
		height: 50px;
	}
	form {
		width: 100%;
		textarea {
			font-size: 1.5rem;
			padding-left: 10px;
			margin-top: 10px;
			margin-bottom: 10px;
			width: 100%;
			height: 250px;
			border-radius: 10px;
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
		.edit-btn,
		.delete-btn {
			width: 200px;
			height: 40px;
			font-size: 1.8rem;
			border-radius: 10px;
			background-color: #00a3ff;
			color: #fff;
		}
		.submit-btn:hover,
		.edit-btn:hover,
		.delete-btn:hover {
			cursor: pointer;
		}
	}
	.graded-class-message {
		font-color: #878787;
		font-size: 2rem;
		text-align: center;
		margin: 10px;
	}
`;

export default AssignmentSubmission;
