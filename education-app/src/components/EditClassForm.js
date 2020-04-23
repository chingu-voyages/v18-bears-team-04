import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";

import ValidationError from "./ValidationError";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const EditClassForm = (props) => {
	const initialFormState = {
		className: "",
		classCode: "",
		studentIds: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [allStudents, setStudents] = useState([]);
	const [enrolled, setEnrolled] = useState([]);
	const [selected, setSelected] = useState([]);
	const [error, setError] = useState(null);
	const { className } = userInput;

	const history = useHistory();

	const getClassInfo = () => {
		const classId = TokenService.getClassToken();
		Promise.all([
			ApiService.getUsers(),
			ApiService.getClassById(classId),
			ApiService.getClasses(),
		])
			.then((res) => {
				/*Set all students for drop down menu*/
				const students = res[0]
					.filter((a) => a.role === "student")
					.map((a) => {
						return { label: a.userName, value: a._id };
					});

				setStudents(students);

				/*This will show all current students as checked in dropdown*/
				const filteredStudents = students.filter((a) =>
					res[1].studentIds.find((i) => i === a.value)
				);

				setSelected(filteredStudents);
				setEnrolled(filteredStudents); //compared to selected array

				//Currently no class code in req.body
				// console.log(res[2]);
				// const classCode = res[2].filter((c) => classId === c._id);
				// console.log(classCode);

				/*Set class information to prefilled form*/
				setInput({
					className: res[1].className,
					classCode: res[1].classCode,
					studentIds: res[1].studentIds,
				});
			})
			.catch((err) => setError(err));
	};

	useEffect(() => getClassInfo(), []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const classId = TokenService.getClassToken();

		const studentsToAdd = selected.filter(
			(a) => !enrolled.some((b) => a.label === b.label)
		);

		const studentsToDelete = enrolled.filter(
			(a) => !selected.some((b) => a.label === b.label)
		);

		const add = studentsToAdd.map((a) =>
			ApiService.addStudentToClass(classId, a.value)
		);

		const deleteStudent = studentsToDelete.map((a) =>
			ApiService.deleteStudentFromClass(classId, a.value)
		);

		Promise.all([add, deleteStudent])
			.then((res) => {
				alert("Changes have been made.");
				props.handleClassModal();
				history.push(`/${props.userName}/teacher/dashboard`);
			})

			.catch((err) => setError(err));
	};

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again`;
		}
	};

	return (
		<EditClassFormStyle>
			<div className='create-class-box'>
				<h1> Edit Class</h1>
				<form className='form-flex' onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='class-name'>
						Class Name
						<br />
						<input
							type='text'
							name='className'
							placeholder='e.g. Math 101'
							value={className}
							// onChange={(e) => handleChange(e)}
							disabled={true}
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
						<button className='modal-btn'>Submit</button>
					</div>
				</form>
			</div>
		</EditClassFormStyle>
	);
};

const EditClassFormStyle = styled.div`
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
		input[type="search"] {
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
		margin: 20px 20px;
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

export default EditClassForm;
