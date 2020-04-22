import React, { useState, useEffect } from "react";
import ValidationError from "./ValidationError";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const EditClassForm = (props) => {
	const initialFormState = {
		className: "",
		studentIds: "",
		studentNames: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [error, setError] = useState(null);
	const { className, classCode } = userInput;

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const getClassInfo = () => {
		const classId = TokenService.getClassToken();
		ApiService.getClassById(classId).then((res) => {
			console.log(res);
			setInput(res);
		});
	};

	useEffect(() => getClassInfo(), []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newClassObj = {
			className,
			classCode,
			teacherName: props.userName,
		};

		ApiService.addClass(newClassObj)
			.then((res) => {
				TokenService.saveClassToken(res._id);
				props.handleClassModal();
				props.setClassName(res.className);
				// history.push(`/${props.userName}/dashboard`);
			})
			.catch((err) => setError(err));
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again`;
		}
	};

	return (
		<EditClassFormStyle>
			<div className='create-class-box'>
				<h1> Edit Class</h1>
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
		</EditClassFormStyle>
	);
};

const EditClassFormStyle = styled.div`
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
export default EditClassForm;
