import React, { useState } from "react";
import ValidationError from "./ValidationError";
import ApiService from "../services/api-services";
import styled from "styled-components";

const SignUpForm = (props) => {
	const initialState = { username: "", email: "", userType: "" };
	const [userInput, setInput] = useState(initialState);
	const [{ error }, setError] = useState({ error: null });
	const { username, email, userType } = userInput;

	const handleChange = (e) => {
		setError({ error: null });
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			userName: username,
			email: email,
			role: userType,
		};
		ApiService.addUser(newUser)
			.then((res) => {
				props.handleLogIn(res.userName, res.role);
			})
			.catch((err) => setError({ error: err }));
	};

	const errorMessage = () => {
		if (error != null) {
			return `User name is not found.`;
		}
	};

	return (
		<SignUpFormStyle>
			<div className='modal-box'>
				<h1 className='modal-title'>{props.formType}</h1>
				<form className='modal-form' onSubmit={(e) => handleSubmit(e)}>
					<input
						className='username-input'
						type='text'
						name='username'
						placeholder='username'
						value={username}
						onChange={(e) => handleChange(e)}
						required
					/>
					<input
						className='email-input'
						type='email'
						name='email'
						value={email}
						onChange={(e) => handleChange(e)}
						placeholder='E-mail'
						required
					/>
					<div className='sign-up-user-info'>
						I am a:
						<br />
						<div className='radio-wrapper'>
							<input
								type='radio'
								id='teacher'
								name='userType'
								value='teacher'
								onChange={(e) => handleChange(e)}
							/>
							<label htmlFor='teacher'>Teacher</label>
						</div>
						<div className='radio-wrapper'>
							<input
								type='radio'
								id='student'
								name='userType'
								value='student'
								onChange={(e) => handleChange(e)}
							/>
							<label htmlFor='student'>Student</label>
						</div>
					</div>
					<ValidationError message={errorMessage()} />
					<button className='modal-btn' value={props.formType}>
						{props.formType}
					</button>
				</form>
			</div>
		</SignUpFormStyle>
	);
};

const SignUpFormStyle = styled.div`
	.modal-box {
		width: 500px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.modal-title {
		font-size: 4rem;
		padding: 30px;
		text-align: center;
		color: #00a3ff;
	}
	.email-input,
	.username-input {
		display: block;
		width: 80%;
		margin: 10px auto;
		padding-left: 10px;
		height: 60px;
		font-size: 2rem;
		border-radius: 10px;
		border: 1px solid #00a3ff;
		outline: 0;
	}
	.modal-btn {
		display: block;
		height: 50px;
		width: 200px;
		padding: 10px;
		margin: 20px auto;
		font-size: 2rem;
		background-color: #00a3ff;
		color: #fff;
		border-radius: 10px;
		cursor: pointer;
	}
	.sign-up-user-info {
		text-align: center;
		padding: 10px;
		font-size: 2rem;
		color: #5d5d5d;
	}
	.sign-up-user-info label {
		font-size: 2rem;
		vertical-align: middle;
	}
	input[type="radio"] {
		vertical-align: middle;
	}
	.radio-wrapper {
		display: inline-block;
		margin: 5px;
	}
`;

export default SignUpForm;
