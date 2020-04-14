import React, { useState } from "react";
import styled from "styled-components";

const CreateAssignmentForm = (props) => {
	const initialFormState = {
		assignmentName: "",
		className: "",
		dueDate: "",
		startDate: "",
		files: "",
		instructions: "",
		showModal: false,
	};
	const [userInput, setInput] = useState(initialFormState);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const {
		assignmentName,
		className,
		dueDate,
		startDate,
		files,
		instructions,
	} = userInput;

	return (
		<CreateAssignmentFormStyle>
			<div className='create-assignment-box'>
				<h1> Add An Assignment</h1>
				<form className='form-grid'>
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
							value={className}
							onChange={(e) => handleChange(e)}
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
							value={files}
							onChange={(e) => handleChange(e)}
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
		grid-template-rows: 1fr 1fr 1fr 1fr;
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
		margin: 20px auto;
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
		rid-column-start: 1;
		grid-column-end: 3;
	}
`;
export default CreateAssignmentForm;
