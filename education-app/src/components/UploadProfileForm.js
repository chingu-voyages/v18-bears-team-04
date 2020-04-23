import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

import ValidationError from "./ValidationError";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

import exampleImg from "../images/maria-hill-teacher.jpg";

const UploadProfileForm = (props) => {
	const initialFormState = {
		profileImg: "",
		profileImgPreview: "",
	};
	const [userInput, setInput] = useState(initialFormState);

	const [{ error }, setError] = useState({ error: null });
	const { profileImg, profileImgPreview } = userInput;

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again.`;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const classId = TokenService.getClassToken();
		const userId = TokenService.getAuthToken();

		console.log("clicked");

		// .catch((err) => setError({ error: err }));
		//awaiting startDate/endDate input
	};

	return (
		<UploadProfileFormStyle>
			<div className='create-assignment-box'>
				<h1> View/Edit Your Profile</h1>

				<form className='form-flex' onSubmit={(e) => handleSubmit(e)}>
					<div className='preview-img'>
						<img src={exampleImg} alt='' />
					</div>

					<label htmlFor='img' className='profile-img'>
						Upload A New Profile Image
						<br />
						<input
							type='file'
							name='files'
							value={profileImg}
							onChange={(e) => handleChange(e)}
						/>
					</label>

					<label htmlFor='username' className='username'>
						Username
						<br />
						<input
							type='text'
							name='userName'
							placeholder='e.g. Syllabus'
							value={props.userName}
							// onChange={(e) => handleChange(e)}
						/>
					</label>

					<label htmlFor='email-address' className='email-address'>
						Email
						<br />
						<input
							type='text'
							name='email'
							value={props.email}
							//MVP - teachers should only have one class
							readOnly={true}
						/>
					</label>

					<button className='modal-btn'>Save</button>
				</form>
				<ValidationError message={errorMessage()} />
			</div>
		</UploadProfileFormStyle>
	);
};

const UploadProfileFormStyle = styled.div`
	.create-assignment-box {
		width: 400px;
		height: 700px;
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
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.form-flex div,
	.form-flex label {
		display: block;
		// border: 2px solid black;
		margin: 20px;
		text-align: center;
	}
	.preview-img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		overflow: hidden;
		img {
			height: 100%;
		}
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
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 10px;
		font-size: 2rem;
		border: 2px solid #c4c4c4;
	}
	.start-date,
	.due-date {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;
export default UploadProfileForm;
