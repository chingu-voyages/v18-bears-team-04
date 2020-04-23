import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";

import ValidationError from "../components/ValidationError";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const EditClass = (props) => {
	return (
		<EditClassStyle>
			<div className='create-class-box'>
				<h1> Edit Class</h1>
				<form className='form-flex'>
					{" "}
					{/* //onSubmit={(e) => handleSubmit(e)}> */}
					<label htmlFor='class-name'>
						Class Name
						<br />
						<input
							type='text'
							name='className'
							placeholder='e.g. Math 101'
							// value={className}
							// onChange={(e) => handleChange(e)}
							disabled={true}
						/>
					</label>
					<div className='enrolled-student'>enrolled STudents</div>
					<label htmlFor='class-name'>
						Add Students
						{/* <MultiSelect
							// options={allStudents !== undefined && allStudents}
							// value={selected}
							// onChange={setSelected}
							labelledBy={"Select"}
						/> */}
					</label>
					{/* <ValidationError message={errorMessage()} /> */}
					<div className='button-container'>
						<button className='modal-btn'>Submit</button>
					</div>
				</form>
			</div>
		</EditClassStyle>
	);
};

const EditClassStyle = styled.div`
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

export default EditClass;
