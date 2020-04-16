import React, { useState } from "react";
import ValidationError from "./ValidationError";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ApiService from "../services/api-services";

const CreateClassForm = (props) => {
	const initialFormState = {
		className: "",
		classCode: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [{ error }, setError] = useState({ error: null });
	const { className, classCode } = userInput;

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newClassObj = {
			className,
			classCode,
			teacherName: props.userName,
		};

		ApiService.addClass(newClassObj)
			.then((res) => {
				history.push(`/${props.userName}/dashboard`);
			})
			.catch((err) => setError({ error: err }));
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again`;
		}
	};

	return (
		<CreateClassFormStyle>
			<div className='create-class-box'>
				<h1> Add A Class</h1>
				<form className='form-flex' onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='class-name'>
						Class Name
						<br />
						<input
							type='text'
							name='className'
							placeholder='e.g. Math 101'
							value={className}
							onChange={(e) => handleChange(e)}
						/>
					</label>

					<label htmlFor='classCode'>
						Class Code
						<br />
						<input
							type='text'
							name='classCode'
							placeholder='Create A Code'
							value={classCode}
							onChange={(e) => handleChange(e)}
						/>
					</label>

					<ValidationError message={errorMessage()} />
					<div className='button-container'>
						<button className='modal-btn'>Create</button>
					</div>
				</form>
			</div>
		</CreateClassFormStyle>
	);
};

const CreateClassFormStyle = styled.div`
	.create-class-box {
		width: 400px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	h1 {
		text-align: center;
		font-size: 4rem;
		margin: 20px;
	}
	.form-flex {
		background-clip: content-box;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		height: 90%;
		padding: 20px;
	}
	label {
		font-size: 2rem;
		margin: 10px;
	}
	input {
		margin-left: 20px;
		margin-top: 10px;
		padding-left: 10px;
		font-size: 1.75rem;
		height: 30px;
		width: 300px;
	}
	.selection {
		margin-left: 20px;
		width: 400px;
		font-size: 1.75rem;
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
	.button-container {
		display: flex;
	}
	.choice-instructions {
		margin: 10px;
	}
`;
export default CreateClassForm;
