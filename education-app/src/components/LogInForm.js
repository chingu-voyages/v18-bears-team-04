import React, { useState } from "react";
import styled from "styled-components";

const LogInForm = (props) => {
	const [username, setInput] = useState("");

	const handleChange = (e) => {
		const { value } = e.target;
		setInput(value);
	};

	return (
		<LogInFormStyle>
			<div className='modal-box'>
				<h1 className='modal-title'>{props.formType}</h1>
				<form className='modal-form'>
					<input
						className='username-input'
						type='text'
						name='username'
						placeholder='username'
						value={username}
						onChange={(e) => handleChange(e)}
						required
					/>

					<button
						className='modal-btn'
						value={props.formType}
						onClick={(e) => props.handleLogIn(e)}
						//will change to form submit
					>
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
