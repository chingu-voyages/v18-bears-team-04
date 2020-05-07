import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import config from "../../config";
import ValidationError from "../../components/ValidationError";
import SideNav from "../../components/SideNav";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

const AssignmentSubmission = (props) => {
	// TO DO: Download file from download button
	const initialFormState = {
		studentFeedback: "",
		studentAnswers: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [{ error }, setError] = useState({ error: null });
	const [user, setUser] = useState(null);
	const [fileUrl, setFileUrl] = useState([]);
	const [files, setFiles] = useState([{ value: "" }]);
	const [assignment, setAssignment] = useState(null);

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

				let list = [];
				if (currentAssignment.teacherDocLink.length > 0) {
					list = currentAssignment.teacherDocLink.map(
						(a) => config.FILE_BASE_URL + a
					);
				}

				setInput(assignmentContent);
				setFileUrl(list);
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

	const formatDate = () => {
		if (assignment.dueDate === null) {
			return "Due Date Unavailable";
		}
		return moment(assignment.dueDate).format("MMMM DD, YYYY");
	};

	//FOR STUDENT SUBMISSION START//
	const handleTextChange = (e) => {
		e.preventDefault();
		const { value, name } = e.target;

		setInput({ ...userInput, [name]: value });
	};

	const handleFileChange = (e) => {
		e.preventDefault();
		const values = [...files];
		if (files.length === 1) {
			setFiles([{ value: e.target.files[0] }]);
		} else {
			let newList = values.map((item) => {
				if (item.value === "") {
					item.value = e.target.files[0];
				}
				return item;
			});

			setFiles(newList);
		}
	};

	const addInput = (e) => {
		e.preventDefault();
		const values = [...files];
		if (values.length === 2) {
			alert("Maximum upload files allowed is 2 or less.");
		} else {
			values.push({ value: "" });
			setFiles(values);
		}
	};

	const renderInput = (
		<input
			type='file'
			name='files'
			accept='application/pdf,application/msword'
			onChange={(e) => handleFileChange(e)}
		/>
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const userId = TokenService.getAuthToken();
		const { studentFeedback, studentAnswers } = userInput;

		const obj = {
			studentFeedback,
			studentAnswers,
			studentId: user._id,
			assignmentId: assignment._id,
		};

		ApiService.submitAssignment(obj).then((res) => {
			files.map((a) => {
				const formData = new FormData();
				formData.append("doc", a.value);
				return ApiService.uploadStudentAssignmentFile(
					formData,
					res.assignment._id,
					userId
				);
			});
			props.history.goBack();
		});
	};

	const renderFileDownload =
		fileUrl !== null
			? fileUrl.map((a, index) => {
					return (
						<a key={index} className='download-btn' href={a} download>
							Download File {index + 1}
						</a>
					);
			  })
			: null;

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
				<div className='file-downloads'>{renderFileDownload}</div>

				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='submission'>
						<h2>Type Answers or Upload a File Below</h2>
						<textarea
							className='text-area'
							name='studentAnswers'
							placeholder='Write your submission here'
							onChange={(e) => handleTextChange(e)}
						/>
					</label>

					<label htmlFor='feedback'>
						<h2>Feedback</h2>
						<textarea
							className='feedback'
							name='studentFeedback'
							placeholder='Feedback details '
							onChange={(e) => handleTextChange(e)}
						/>
					</label>

					<label htmlFor='files' className='upload-file-label'>
						<span className='upload-file-title'>Upload File</span>
						{files.map((a, index) => (
							<div key={index}>{renderInput}</div>
						))}
						<button className='add-file-btn' onClick={(e) => addInput(e)}>
							Add A File
						</button>
					</label>
					{user !== null && user.role === "student" && (
						<div className='btns'>
							<button className='submit-btn'>SUBMIT</button>
						</div>
					)}

					{error !== null && <ValidationError message={errorMessage()} />}
				</form>
			</>
		);

	//FOR STUDENT SUBMISSION END//

	/*TEACHER SUBMISSION VIEW START */
	// Teacher Delete
	const handleDelete = () => {
		ApiService.deleteAssignmentById(
			props.match.params.assignmentId
		).then((res) => props.history.goBack());
	};

	const renderTeacherSubmissionView = assignment !== null &&
		user.role === "teacher" && (
			<>
				{" "}
				<h1> {assignment.title}</h1>
				<div className='assignment-details'>
					<div className='instructions'>
						Instructions:
						<div className='instructions-container'>
							{assignment !== null
								? assignment.instructions
								: "Instructions Unavailable"}
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
				<div className='file-downloads'>{renderFileDownload}</div>
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='submission'>
						<textarea
							className='text-area'
							placeholder='Write your submission here'
							disabled
						/>
					</label>
					<label htmlFor='files' className='upload-file-label'>
						<span className='upload-file-title'>Upload File</span>
						<input type='file' name='file' disabled />
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
	/*TEACHER SUBMISSION VIEW END */
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
		overflow-y: scroll;
		height: 140px;
	}
	.download-btn {
		display: block;
		text-align: center;
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
		.add-file-btn {
			width: 100px;
			border: 1px solid #ffffff;
			background-color: #ffffff;
			border-radius: 5px;
			margin: 5px;
			font-size: 1rem;
		}
		.upload-file-label {
			display: flex;
			flex-direction: column;
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
	.file-downloads {
		margin: 5px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
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
