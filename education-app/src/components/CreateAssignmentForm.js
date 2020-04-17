import React, { useState } from "react";
import styled from "styled-components";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const CreateAssignmentForm = (props) => {
	const initialFormState = {
		assignmentName: "",
		className: props.className,
		endDate: "",
		startDate: "",
		files: "",
		description: "",
		showModal: false,
	};
	const [userInput, setInput] = useState(initialFormState);
	const [{ error }, setError] = useState({ error: null });
	const { assignmentName, endDate, startDate, files, description } = userInput;

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const classId = TokenService.getClassToken();
		const userId = TokenService.getAuthToken();
		const newAssignmentObj = {
			classId,
			userId,
			description,
			title: assignmentName,
			teacherName: props.userName,
		};

		ApiService.addAssignment(newAssignmentObj)
			//Add close modal and go to assignments list
			.then((res) => console.log(res))
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
							name='description'
							placeholder='Write your instructions here'
							value={description}
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
							name='endDate'
							value={endDate}
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
		grid-column-start: 1;
		grid-column-end: 3;
	}
`;
export default CreateAssignmentForm;
