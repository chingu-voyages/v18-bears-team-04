import React from "react";
import styled from "styled-components";

const ModalForm = (props) => {
	return (
		<ModalStyle>
			<div className='modal-box'>
				<h1 className='modal-title'>{props.formType}</h1>
				<form className='modal-form'>
					<input
						className='email-input'
						type='email'
						name='email'
						placeholder='E-mail'
						required
					/>
					{props.formType === "Sign Up" ? (
						<div className='sign-up-user-info'>
							I am a:
							<br />
							<div className='radio-wrapper'>
								<input
									type='radio'
									id='teacher'
									name='user-type'
									value='teacher'
								/>
								<label for='teacher'>Teacher</label>
							</div>
							<div className='radio-wrapper'>
								<input
									type='radio'
									id='student'
									name='user-type'
									value='student'
								/>
								<label for='student'>Student</label>
							</div>
						</div>
					) : null}

					<button className='modal-btn'>{props.formType}</button>
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
	.email-input {
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
	.sign-up-user-info {
		text-align: center;
		padding: 10px;
		font-size: 2rem;
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

export default ModalForm;
