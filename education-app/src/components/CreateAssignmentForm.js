import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import moment from "moment";

import ValidationError from "../components/ValidationError";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const CreateAssignmentForm = (props) => {
	const initialFormState = {
		assignmentName: "",
		className: props.className,
		dueDate: "",
		startDate: "",
		instructions: "",
		showModal: false,
		renderAddAssignment: false,
	};
	const [userInput, setInput] = useState(initialFormState);
	const [files, setFiles] = useState([{ value: "" }]);
	const [{ error }, setError] = useState({ error: null });
	const { assignmentName, dueDate, startDate, instructions } = userInput;

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const handleDateChange = (e) => {
		const { value, name } = e.target;

		setInput({ ...userInput, [name]: value });
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again.`;
		}
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const classId = TokenService.getClassToken();
		const userId = TokenService.getAuthToken();
		const newAssignmentObj = {
			classId,
			userId,
			instructions,
			title: assignmentName,
			teacherName: props.userName,
			startDate,
			dueDate,
		};

		const formattedStartDate = moment(startDate).format(
			"YYYY-MM-DDTHH:mm:ss.SSS[Z]"
		);
		const formattedDueDate = moment(dueDate).format(
			"YYYY-MM-DDTHH:mm:ss.SSS[Z]"
		);
		const today = moment().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

		console.log(today, formattedStartDate, formattedDueDate);

		if (today > formattedDueDate) {
			alert("Due date cannot be before today.");
		} else if (formattedDueDate < formattedStartDate) {
			alert("Due date cannot be before start date.");
		} else {
			ApiService.addAssignment(newAssignmentObj)
				.then((res) => {
					files.map((a) => {
						const formData = new FormData();
						formData.append("doc", a.value);
						return ApiService.uploadAssignmentFile(
							formData,
							res.assignment._id
						);
					});
					setInput({
						assignmentName: "",
						className: props.className,
						dueDate: "",
						startDate: "",
						files: [{ value: "" }],
						description: "",
					});
					history.push(`/${props.userName}/assignments`);
				})
				// TO DO: make error message for non doc or pdf files
				.catch((err) => {
					setError({ error: err });
				});
		}
	};

	const addInput = (e) => {
		e.preventDefault();
		const values = [...files];
		if (values.length === 3) {
			alert("Maximum upload files allowed is 3 or less.");
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
			multiple
		/>
	);

	return (
		<CreateAssignmentFormStyle>
			<div className='create-assignment-box'>
				<h2> Add An Assignment</h2>

				<form className='form-grid' onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='assignment-name' className='assignment-name'>
						Assignment Name
						<br />
						<input
							type='text'
							name='assignmentName'
							placeholder='e.g. Syllabus'
							value={assignmentName}
							onChange={(e) => handleChange(e)}
							required
						/>
					</label>

					<label htmlFor='class-name'>
						Class
						<br />
						<input
							type='text'
							name='className'
							placeholder='e.g. Math 101'
							value={
								props.className === null
									? "Make A Class First"
									: props.className
							}
							//MVP - teachers should only have one class
							readOnly={true}
						/>
					</label>

					<label htmlFor='instructions'>
						Instructions
						<br />
						<textarea
							className='text-area-box'
							name='instructions'
							placeholder='Write your instructions here'
							value={instructions}
							onChange={(e) => handleChange(e)}
							required
						/>
					</label>

					<label htmlFor='files' className='files'>
						File
						<br />
						{files.map((a) => renderInput)}
						<button className='add-file-btn' onClick={(e) => addInput(e)}>
							Add A File
						</button>
					</label>

					<div className='dates'>
						<label htmlFor='start-date'>
							Start Date
							<br />
							<input
								type='date'
								name='startDate'
								value={startDate}
								onChange={(e) => handleDateChange(e)}
								required
							/>
						</label>

						<label htmlFor='due-date'>
							Due Date
							<br />
							<input
								type='date'
								name='dueDate'
								value={dueDate}
								onChange={(e) => handleDateChange(e)}
								required
							/>
						</label>
					</div>

					<button className='modal-btn' type='submit'>
						Create
					</button>
				</form>
				<ValidationError message={errorMessage()} />
			</div>
		</CreateAssignmentFormStyle>
	);
};

const CreateAssignmentFormStyle = styled.div`
	.create-assignment-box {
		width: 600px;
		height: 600px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h2 {
		text-align: center;
		font-size: 4rem;
		margin: 20px;
		color: #00a3ff;
	}
	.form-grid {
		background-clip: content-box;
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 0.5fr;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: "assignment-name class-name" "instructions files" "dates files" "modal-btn modal-btn";
		height: 90%;
		width: 100%;
		padding: 20px;
	}
	label {
		font-size: 2rem;
		color: #5e5e5e;
		&:nth-child(odd) {
			padding-right: 10px;
		}
		&:nth-child(even) {
			padding-left: 10px;
		}
	}
	input {
		height: 30px;
		width: 200px;
		width: 100%;
		margin-top: 10px;
		/* margin-left: 20px;
		padding-left: 10px; */
		font-size: 1.75rem;
		outline: 0;
		border: 0.5px solid #00a3ff;
	}

	input[type="date"],
	input[type="text"] {
		padding-left: 10px;
		font-family: sans-serif;
		font-size: 1.5rem;
	}

	.files {
		input {
			border: none;
		}
		.add-file-btn {
			border-radius: 5px;
			padding: 5px;
			background-color: #00a3ff;
			color: #ffffff;
		}
		grid-row-start: 2;
		grid-row-end: 4;
	}

	.text-area-box {
		width: 100%;
		height: 90px;
		margin-top: 10px;
		border: 0.5px solid #00a3ff;
		padding-left: 10px;
		padding-top: 10px;
	}
	.modal-btn {
		background-color: #00a3ff;
		display: block;
		height: 50px;
		color: #fff;
		/* width: 140px; */
		width: 200px;
		padding: 10px;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 10px;
		font-size: 2rem;
		border: none;
		border-radius: 10px;
		cursor: pointer;
	}
	.dates {
		label {
			padding-left: 0px;
		}
		input {
			margin-bottom: 5px;
		}
		.start-date,
		.due-date {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}

	.modal-btn {
		grid-column-start: 1;
		grid-column-end: 3;
	}
	.assignment-created {
		text-align: center;
		color: green;
		font-size: 2rem;
		font-style: italic;
	}
`;
export default CreateAssignmentForm;
