import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import ValidationError from "../components/ValidationError";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const CreateAssignmentForm = (props) => {
	const initialFormState = {
		assignmentName: "",
		className: props.className,
		dueDate: "",
		startDate: "",
		files: "",
		instructions: "",
		showModal: false,
	};
	const [userInput, setInput] = useState(initialFormState);

	const [{ error }, setError] = useState({ error: null });
	const { assignmentName, dueDate, startDate, files, instructions } = userInput;

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again.`;
		}
	};

	const handleFileChange = (e) => {
		const { name } = e.target;
		e.preventDefault();

		setInput({ ...userInput, [name]: e.target.files[0] });
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

		const formData = new FormData();
		formData.append("doc", files);

		ApiService.addAssignment(newAssignmentObj)
			//Add close modal and go to assignments list
			.then((res) => {
				ApiService.uploadAssignmentFile(formData, res.assignment._id);
				setInput({
					assignmentName: "",
					className: props.className,
					dueDate: "",
					startDate: "",
					files: "",
					description: "",
				});
				history.push(`/${props.userName}/assignments`);
			})
			//make error message for non doc or pdf files
			.catch((err) => setError({ error: err }));
		//awaiting startDate/endDate input
	};

	return (
		<CreateAssignmentFormStyle>
			<div className='create-assignment-box'>
				<h1> Add An Assignment</h1>

				<form className='form-grid' onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='assignment-name'>
						Assignment Name
						<br />
						<input
							type='text'
							name='assignmentName'
							placeholder='e.g. Syllabus'
							value={assignmentName}
							onChange={(e) => handleChange(e)}
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
						/>
					</label>

					<label htmlFor='files'>
						Files
						<br />
						<input
							type='file'
							name='files'
							onChange={(e) => handleFileChange(e)}
						/>
					</label>

					<label htmlFor='start-date' className='start-date'>
						Start Date
						<br />
						<input
							type='datetime-local'
							name='startDate'
							value={startDate}
							onChange={(e) => handleChange(e)}
						/>
					</label>

					<label htmlFor='due-date' className='due-date'>
						Due Date
						<br />
						<input
							type='datetime-local'
							name='dueDate'
							value={dueDate}
							onChange={(e) => handleChange(e)}
						/>
					</label>

					<button className='modal-btn'>Create</button>
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
	h1 {
		text-align: center;
		font-size: 4rem;
		margin: 20px;
	}
	.form-grid {
		background-clip: content-box;
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 0.5fr;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: "assignment-name class-name" "instructions files" "start-date due-date" "modal-btn modal-btn";
		height: 90%;
		padding: 20px;
	}
	label {
		font-size: 2rem;
	}
	input {
		margin-left: 20px;
		padding-left: 10px;
		font-size: 1.75rem;
		height: 30px;
		width: 200px;
	}
	.text-area-box {
		margin-left: 20px;
		padding-left: 10px;
		height: 90px;
		width: 200px;
	}
	.modal-btn {
		background-color: #c4c4c4;
		display: block;
		height: 50px;
		width: 140px;
		padding: 10px;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 10px;
		font-size: 2rem;
		border: 2px solid #c4c4c4;
	}
	.start-date,
	.due-date {
		display: flex;
		flex-direction: column;
		justify-content: center;
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
