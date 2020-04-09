import React from "react";
import styled from "styled-components";

const ModalForm = () => {
	return (
		<ModalStyle>
			<div className='modal-box'>
				<h1 className='modal-title'>Login</h1>
				<form className='modal-form'>
					<input
						className='form-control'
						type='email'
						name='email'
						placeholder='E-mail'
						required
					/>

					<button className='modal-btn'>Login</button>
				</form>
			</div>
		</ModalStyle>
	);
};

const ModalStyle = styled.div`
	.modal-box {
		width: 300px;
		height: 300px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.modal-title {
		font-size: 4rem;
		padding: 30px;
		text-align: center;
	}
	input {
		display: block;
		margin: auto;
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

export default ModalForm;
