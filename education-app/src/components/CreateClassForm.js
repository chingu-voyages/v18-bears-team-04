import React, { useState, useEffect } from "react";
import ValidationError from "./ValidationError";
import MultiSelect from "react-multi-select-component";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const CreateClassForm = (props) => {
	const initialFormState = {
		className: "",
		classCode: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [allStudents, setStudents] = useState([]);
	const [selected, setSelected] = useState([]);

	const [{ error }, setError] = useState({ error: null });
	const { className, classCode } = userInput;

	const history = useHistory();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setInput({ ...userInput, [name]: value });
	};

	const getAllStudents = () => {
		ApiService.getUsers()
			.then((res) => {
				const students = res
					.filter((a) => a.role === "student")
					.map((a) => {
						return { label: a.userName, value: a._id };
					});
				setStudents(students);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllStudents();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const studentIdArray = selected.map((a) => a.value);

		const newClassObj = {
			className,
			classCode,
			teacherName: props.userName,
			studentIds: studentIdArray,
		};

		ApiService.addClass(newClassObj)
			.then((res) => {
				TokenService.saveClassToken(res._id);
				props.handleClassModal();
				props.setClassName(res.className);
				history.push(`/${props.userName}/dashboard`);
			})
			.catch((err) => setError({ error: err }));
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again`;
		}
	};

	return (
		<CreateClassFormStyle>
			<div className='create-class-box'>
				<h1> Create Your Class</h1>
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

					<label htmlFor='class-name'>
						Add Students
						<MultiSelect
							options={allStudents !== undefined && allStudents}
							value={selected}
							onChange={setSelected}
							labelledBy={"Select"}
						/>
					</label>

					<ValidationError message={errorMessage()} />
					<div className='button-container'>
						<button className='modal-btn'>Create</button>
					</div>
				</form>
			</div>
		</CreateClassFormStyle>
	);
};

const CreateClassFormStyle = styled.div`
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
		height: 40px;
		width: 300px;
		border-radius: 5px;
		border: 1px solid lightgray;
	}
	.multi-select {
		margin-top: 10px;
		margin-left: 20px;
		width: 300px;
		border-radius: 0px;
		div.panel-content {
			width: 300px;
			font-size: 4rem;
		}
		.gray {
			font-size: 1.75rem;
		}
		input[type="checkbox"] {
			width: 15px;
			height: 0px;
			font-size: 4rem;
			margin-bottom: 20px;
		}
		input[type="text"] {
			border: none;
		}
		.dropdown-heading-value {
			font-size: 2.5rem;
		}
		label {
			font-size: 4rem;
		}
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
export default CreateClassForm;
