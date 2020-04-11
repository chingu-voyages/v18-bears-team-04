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
		width: 300px;
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.modal-title {
		font-size: 4rem;
		padding: 30px;
		text-align: center;
	}
	.username-input {
		display: block;
		margin: 10px auto;
		padding-left: 10px;
		height: 60px;
		font-size: 2rem;
	}
	.modal-btn {
		display: block;
		height: 50px;
		width: 100px;
		padding: 10px;
		margin: 20px auto;
		font-size: 2rem;
		border: 2px solid #c4c4c4;
	}
`;

export default LogInForm;
