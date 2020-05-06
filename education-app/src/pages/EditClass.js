import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";

import ValidationError from "../components/ValidationError";
import SideNav from "../components/SideNav";

import styled from "styled-components";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const EditClass = (props) => {
	const initialFormState = {
		className: "",
		studentIds: "",
	};
	const [userInput, setInput] = useState(initialFormState);
	const [allStudents, setStudents] = useState([]);
	const [enrolled, setEnrolled] = useState([]);
	const [selected, setSelected] = useState([]);
	const [error, setError] = useState(null);
	const { className } = userInput;

	const getClassInfo = () => {
		const classId = TokenService.getClassToken();

		Promise.all([ApiService.getUsers(), ApiService.getClassById(classId)])
			.then((res) => {
				/*Set student options for drop down menu*/
				const students = res[0]
					.filter((a) => a.role === "student")
					.map((a) => {
						return { label: a.userName, value: a._id };
					});

				setStudents(students);

				/*This will show all current students as checked in dropdown and set enrolled students in enrolled panel*/
				const filteredStudents = students.filter((a) =>
					res[1].studentIds.find((i) => i === a.value)
				);

				setEnrolled(filteredStudents); //will show in enrolled panel that can be deleted
				setInput({
					className: res[1].className,
					classCode: res[1].classCode,
					studentIds: res[1].studentIds,
				});
			})
			.catch((err) => setError(err));
	};

	useEffect(() => getClassInfo(), []);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong.`;
		}
	};

	const handleDelete = (e) => {
		e.preventDefault();
		const classId = TokenService.getClassToken();
		const studentId = e.target.value;

		const filteredStudents = enrolled.filter((a) => a.value !== studentId);

		ApiService.deleteStudentFromClass(classId, studentId)
			.then((res) => setEnrolled(filteredStudents))
			.catch((err) => setError({ error: err }));
	};

	const handleAddSubmit = (e) => {
		e.preventDefault();
		const classId = TokenService.getClassToken();

		const studentToAdd = selected.filter((a) => !enrolled.some((b) => a === b));

		const add = studentToAdd.map((a) =>
			ApiService.addStudentToClass(classId, a.value)
		);

		Promise.all([add]).then((res) => {
			setEnrolled([...studentToAdd, ...enrolled]);
			setSelected([]);
		});
	};

	const renderEnrolledStudents =
		enrolled !== null
			? enrolled.map((a) => {
					return (
						<li key={a.value} className='delete-student-item'>
							<span className='student-name'>{a.label}</span>
							<button
								value={a.value}
								onClick={(e) => handleDelete(e)}
								className='delete-button'
							>
								Delete
							</button>
						</li>
					);
			  })
			: `You have no enrolled students.`;

	return (
		<>
			<SideNav />
			<EditClassStyle>
				<div className='wrapper'>
					<div className='edit-class-box'>
						<h2 className='page-title'> Edit Class</h2>
						<form className='form-grid'>
							<label htmlFor='class-name'>
								Class Name
								<br />
								{/* Can edit once we can change classnames */}
								<input
									type='text'
									name='className'
									className='class-name-text'
									value={className}
									readOnly={true}
								/>
							</label>
							<label htmlFor='enrolled-students' className='enrolled-students'>
								Enrolled Students
								<div className='enrolled-students-container'>
									<ul>{renderEnrolledStudents}</ul>
								</div>
							</label>
							<label htmlFor='add-students'>
								Add Students
								<MultiSelect
									options={allStudents !== undefined && allStudents}
									value={selected}
									onChange={setSelected}
									labelledBy={"Select"}
								/>
							</label>

							<div className='button-container'>
								<button
									className='modal-btn'
									onClick={(e) => handleAddSubmit(e)}
								>
									Submit
								</button>
							</div>
							{error && <ValidationError message={errorMessage()} />}
						</form>
					</div>
				</div>
			</EditClassStyle>
		</>
	);
};

const EditClassStyle = styled.section`
	padding-left: 250px;
	padding-top: 60px;
	width: 100%;
	height: 100vh;
	h2 {
	}
	.form-grid {
		background-clip: content-box;
		display: grid;
		padding-top: 20px;
		/* height: 500px; */
		height: 100%;
		/* padding: 20px 20px 0; */
		grid-template-rows: 1fr 1fr 0.2fr;
		grid-template-columns: 1fr 1fr;
	}
	label {
		font-size: 2rem;
		/* margin: 10px; */
		color: #5e5e5e;
	}
	input {
		/* margin-left: 20px;
		margin-top: 10px;
		padding-left: 10px; */
		font-size: 1.75rem;
		height: 40px;
		width: 300px;
		border-radius: 5px;
		border: 1px solid lightgray;
		outline: 0;
	}
	.multi-select {
		/* margin-top: 10px;
		margin-left: 20px; */
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
			height: 20px;
			font-size: 4rem;
			margin-bottom: 20px;
			position: relative;
			top: 13px;
		}
		input[type="search"] {
			border: none;
		}
		.dropdown-heading-value {
			font-size: 2.5rem;
		}
		label {
			font-size: 4rem;
			padding-top: 0px;
			padding-bottom: 0px;
		}
	}

	.class-name-text {
		border: none;
		color: #00a3ff;
		margin-top: 10px;
		font-size: 4rem;
	}

	.enrolled-students {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-end: 3;
		grid-row-start: 1;
		padding-bottom: 40px;
		display: block;
		transition: width 2s;
	}

	.selection {
		margin-left: 20px;
		width: 400px;
		font-size: 1.75rem;
	}
	.modal-btn {
		background-color: #00a3ff;
		display: block;
		height: 50px;
		width: 200px;
		color: #fff;
		/* padding: 10px; */
		/* margin: 20px 20px; */
		font-size: 2rem;
		border-radius: 10px;
	}
	.button-container {
		display: flex;
		grid-column-start: 1;
		grid-column-end: 3;
		margin: auto;
	}
	.choice-instructions {
		margin: 10px;
	}
	.delete-button {
		border: 1px solid black;
		background-color: red;
		opacity: 1;
		height: 20px;
		width: 60px;
		color: white;
		font-weight: bold;
		border-radius: 5px;
		border: none;
		display: flex;
		font-size: 1.2rem;
		justify-content: center;
	}

	.delete-button:hover {
		cursor: pointer;
	}

	.delete-student-item {
		margin: 10px;
		display: grid;
		grid-template-columns: 1fr 0.5fr;
		grid-template-rows: 1fr;
	}
	.enrolled-students-container {
		padding: 10px;
		font-size: 2.5rem;
		background-color: #fff;
		box-shadow: 0 5px 10px #0000002f;
		border-radius: 10px;
		margin-top: 10px;
		height: 100%;
		overflow-y: scroll;
		height: 300px;
	}

	.enrolled-students-container::-webkit-scrollbar {
		width: 10px;
		background-color: #000;
		border-radius: 0px 5px 5px 0px;
	}

	/* Track */
	.enrolled-students-container::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	.student-name {
		justify-content: center;
		display: flex;
		align-items: center;
		font-size: 1.5rem;
	}
`;

export default EditClass;
