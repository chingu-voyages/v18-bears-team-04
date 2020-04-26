import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import config from "../config";
import ValidationError from "../components/ValidationError";
import SideNav from "../components/SideNav";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const EditAssignmentSubmission = (props) => {
	const [userInput, setInput] = useState({});
	const [{ error }, setError] = useState({ error: null });
	const [user, setUser] = useState(null);
	const [file, setFile] = useState({});
	const [assignment, setAssignment] = useState(null);
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

	const handleFileChange = (e) => {
		e.preventDefault();

		setFile(e.target.files[0]);
	};

	//EDIT STUDENT ROLE START//

	const formatDate = () => {
		if (assignment.dueDate === null) {
			return "Due Date Unavailable";
		}
		return moment(assignment.dueDate).format("MMMM Do YYYY");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		// formData.append("file", file);
		// formData.append("text", userInput.text);

		ApiService.submitAssignment(
			formData,
			props.match.params.assignmentId,
			user.userName
		).then((res) => console.log(res));
	};

	const handleTextChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setAssignment({
			...assignment,
			[name]: value,
		});
	};

	//EDIT STUDENT ROLE END//

	// TEACHER EDIT ROLE ONLY START //

	const handleAssignmentChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setAssignment({
			...assignment,
			[name]: value,
		});
	};

	const formatEditDate = (date) => {
		let formattedDate;

		formattedDate = moment(date).format("YYYY-MM-DD");

		return formattedDate;
	};

	const handleTeacherEdit = (e) => {
		e.preventDefault();
		const date = moment(assignment.dueDate).toISOString();

		const editObj = {
			title: assignment.title,
			instructions: assignment.instructions,
			dueDate: date,
		};

		const formData = new FormData();
		formData.append("doc", file);

		ApiService.updateAssignmentById(editObj, props.match.params.assignmentId)
			.then((res) => {
				console.log(res);
				ApiService.uploadAssignmentFile(
					formData,
					res.assignment._id
				).then((res) => console.log(res));
				setInput({
					assignmentName: "",
					className: props.className,
					dueDate: "",
					startDate: "",
					file: "",
					description: "",
				});
				history.push(`/${props.userName}/assignments`);
			})
			.catch((err) => setError({ error: err }));
	};

	// TEACHER EDIT ROLE ONLY END //

	const stringURL =
		assignment !== null && assignment.teacherDocLink.length > 0
			? config.DOC_BASE_URL + assignment.teacherDocLink[0]
			: null;

	const renderTeacherEditPage = user !== null && assignment !== null && (
		<>
			<label htmlFor='title'>
				<input
					className='title-style'
					type='text'
					name='title'
					onChange={(e) => handleAssignmentChange(e)}
					value={assignment.title}
				/>
			</label>
			<form htmlFor='edit-assignment-details' className='assignment-details'>
				<label htmlFor='instructions' className='instructions'>
					Instructions:
					<input
						type='text'
						name='instructions'
						value={
							assignment !== null
								? assignment.instructions
								: "Instructions Unavailable"
						}
						className='edit-instructions-container'
						onChange={(e) => handleAssignmentChange(e)}
					/>
				</label>

				<div className='assignment-dates'>
					<div>
						Due Date:
						<input
							type='date'
							name='dueDate'
							value={formatEditDate(assignment.dueDate)}
							className='edit-date-string'
							onChange={(e) => handleAssignmentChange(e)}
						/>
					</div>
				</div>
			</form>

			<label htmlFor='files download-btn'>
				File
				<br />
				<input type='file' name='files' onChange={(e) => handleFileChange(e)} />
			</label>

			<form>
				<label htmlFor='submission'>
					<textarea
						className='text-area'
						name='text'
						placeholder='Student submission goes here'
						disabled={true}
					/>
				</label>
				<label htmlFor='files' className='upload-file-label'>
					<span className='upload-file-title'>Upload File</span>
					<input type='file' name='file' disabled={true} />
				</label>

				<div className='btns'>
					<button className='submit-btn' onClick={(e) => handleTeacherEdit(e)}>
						SUBMIT
					</button>
				</div>
			</form>
		</>
	);

	const renderStudentEditPage = user !== null && user.role === "student" && (
		<>
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
				<Link className='download-btn' to={stringURL} target='_blank' download>
					Download File
				</Link>
			)}
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor='submission'>
					<textarea
						className='text-area'
						name='text'
						// value={text}
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
				{user !== null && user.role === "student" && (
					<div className='btns'>
						<button className='submit-btn'>SUBMIT</button>
					</div>
				)}
			</form>
		</>
	);
	return (
		<>
			<SideNav />
			<EditAssignmentSubmissionStyle>
				<div className='wrap'>
					{user !== null && user.role === "student"
						? renderStudentEditPage
						: renderTeacherEditPage}
				</div>
			</EditAssignmentSubmissionStyle>
		</>
	);
};

const EditAssignmentSubmissionStyle = styled.div`
	.wrap {
		padding-left: 250px;
		padding-top: 60px;
		width: 90vw;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}
	h1,
	.title-style {
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
		padding: 10px;
		overflow-y: scroll;
		height: 140px;
	}

	.edit-instructions-container {
		display: block;

		width: 300px;
		margin: 10px;
		padding: 10px;
		overflow-y: scroll;
		height: 140px;
	}

	.edit-instructions-container input[type="text"] {
		padding-bottom: 120px;
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

export default EditAssignmentSubmission;
