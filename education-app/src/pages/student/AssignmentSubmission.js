import React from "react";
import styled from "styled-components";
import SideNav from "../../components/SideNav";

const AssignmentSubmission = (props) => {
	return (
		<>
			<SideNav />
			<AssignmentSubmissionStyle>
				<div className='wrap'>
					<h1>Assignment Submission</h1>
					<h2 className='assignment-title'>
						{props.match.params.assignmentName}
					</h2>
					<button className='download-btn'>Download File</button>
					<form>
						<textarea></textarea>
						<div className='btns'>
							<button className='submit-btn'>SUBMIT</button>
							<button className='edit-btn'>EDIT</button>
						</div>
					</form>
				</div>
			</AssignmentSubmissionStyle>
		</>
	);
};

const AssignmentSubmissionStyle = styled.div`
	.wrap {
		padding-left: 250px;
		padding-top: 60px;
		width: 90vw;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}
	h1 {
		font-size: 4rem;
		color: #00a3ff;
		margin-top: 20px;
	}
	.assignment-title {
		font-size: 2.5rem;
		color: #5f5f5f;
		margin-top: 10px;
	}
	.download-btn {
		width: 200px;
		height: 30px;
		margin-top: 20px;
		font-size: 1.6rem;
		background-color: #00a3ff;
		color: #fff;
		border-radius: 10px;
	}
	form {
		width: 100%;
		textarea {
			margin-top: 40px;
			width: 100%;
			min-height: 250px;
			border-radius: 10px;
		}
		.btns {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			margin-top: 30px;
			.submit-btn,
			.edit-btn {
				width: 200px;
				height: 40px;
				font-size: 1.8rem;
				border-radius: 10px;
				background-color: #00a3ff;
				color: #fff;
			}
		}
	}
`;

export default AssignmentSubmission;
