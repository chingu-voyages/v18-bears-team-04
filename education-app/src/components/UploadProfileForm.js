import React, { useState } from "react";

import styled from "styled-components";

import ValidationError from "./ValidationError";
import defaultImg from "../images/defaultImg.png";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const UploadProfileForm = (props) => {
	const initialFormState = {
		profileImg: "",
		profileImgPreview: props.profileImgPreview,
	};
	const [userInput, setInput] = useState(initialFormState);

	const [{ error }, setError] = useState({ error: null });
	const { profileImg, profileImgPreview } = userInput;

	const handleImgChange = (e) => {
		e.preventDefault();

		setInput({
			profileImgPreview: URL.createObjectURL(e.target.files[0]),
			profileImg: e.target.files[0],
		});
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again.`;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userId = TokenService.getAuthToken();
		const formData = new FormData();
		formData.append("profile", profileImg);

		ApiService.uploadProfileImg(formData, userId)
			.then((res) => {
				props.updateUserProfile(`/profile/${res.data.name}`);
				console.log(`/profile/${res.data.name}`);
				props.handleUploadProfileModal();
			})
			.catch((err) => console.log(err));
	};

	return (
		<UploadProfileFormStyle>
			<div className='create-assignment-box'>
				<h1> View/Edit Your Profile</h1>

				<form className='form-flex' onSubmit={(e) => handleSubmit(e)}>
					<div className='preview-img'>
						<img src={profileImgPreview} alt='' />
					</div>

					<label htmlFor='img' className='profile-img'>
						Upload A New Profile Image
						<br />
						<input
							type='file'
							name='profileImg'
							accept='image/*'
							onChange={(e) => handleImgChange(e)}
						/>
					</label>

					<label htmlFor='username' className='username'>
						{props.userName}
						<br />
						<input
							type='text'
							name='userName'
							placeholder='e.g. Syllabus'
							value={props.userName}
							readOnly={true}
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
				{error !== null && <ValidationError message={errorMessage()} />}
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

	label {
		color: #00a3ff;
	}
	input {
		font-size: 1.75rem;
		height: 30px;
		width: 200px;
	}
	input[type="text"],
	input[type="email"] {
		border: none;
		text-align: center;
		margin-left: none;
		padding-left: none;
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
