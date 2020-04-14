import React, { useState } from "react";
import ValidationError from "./ValidationError";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";
import styled from "styled-components";

const LogInForm = (props) => {
	const [{ username }, setInput] = useState({ username: "" });
	const [{ error }, setError] = useState({ error: null });

	const handleChange = (e) => {
		setError({ error: null });
		const { value } = e.target;
		setInput({ username: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		ApiService.getUserName(username)
			.then((res) => {
				props.handleLogIn(res.userName, res.role);
				TokenService.saveAuthToken(res.userName);
			})
			.catch((err) => setError({ error: err }));
	};

	const errorMessage = () => {
		if (error != null) {
			return `User name is not found.`;
		}
	};

	return (
		<LogInFormStyle>
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
					<ValidationError message={errorMessage()} />
					<button className='modal-btn' value={props.formType}>
						{props.formType}
					</button>
				</form>
			</div>
		</LogInFormStyle>
	);
};

const LogInFormStyle = styled.div`
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
`;

export default LogInForm;
