import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DropDownMenu from "../components/DropDownMenu";

const CreateClassForm = (props) => {
	const initialFormState = {
		className: "",
		description: "",
		showModal: false,
	};
	const [userInput, setInput] = useState(initialFormState);
	const [{ error }, setError] = useState({ error: false });
	const [users, setUsers] = useState({});
	const [{ usersLoaded }, setUsersLoaded] = useState({
		studentsLoaded: false,
	});

	const { className, description } = userInput;

	async function fetchUsers() {
		const res = await fetch("http://localhost:5000/api/user");
		res
			.json()
			.then((res) => setUsers(res))
			.then((res) => setUsersLoaded({ usersLoaded: true }))
			.catch((err) => setError({ error: err }));
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const selectionItems = console.log(students);

	return (
		<CreateClassFormStyle>
			<div className='create-class-box'>
				<h1> Add A Class</h1>
				<form className='form-flex'>
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

					<label htmlFor='description'>
						Description
						<br />
						<textarea
							className='text-area-box'
							name='description'
							placeholder='What is this class about?'
							value={description}
							onChange={(e) => handleChange(e)}
						/>
					</label>

					<label htmlFor='students'>
						Add Students
						<br />
						<div className='students-drop-down'>
							<DropDownMenu selectionItems={selectionItems} />
						</div>
					</label>

					<div className='button-container'>
						<button className='modal-btn' onClick={() => props.handleModal()}>
							Cancel
						</button>
						<button className='modal-btn'>Create</button>
					</div>
				</form>
			</div>
		</CreateClassFormStyle>
	);
};

const CreateClassFormStyle = styled.div`
	.create-class-box {
		width: 600px;
		height: 600px;
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
		padding-left: 10px;
		font-size: 1.75rem;
		height: 30px;
		width: 400px;
	}
	.text-area-box {
		margin-left: 20px;
		padding-left: 10px;
		font-size: 1.75rem;
		height: 90px;
		width: 400px;
	}
	.students-drop-down {
		width: 400px;
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
`;
export default CreateClassForm;
