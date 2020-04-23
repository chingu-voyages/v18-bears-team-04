import React from "react";
import SideNav from "../../components/SideNav";
import styled from "styled-components";

const AssignmentView = (props) => {
	return (
		<>
			<SideNav />
			<AssignmentViewStyle>
				<div className='assignment-view-container'>
					<h1>Assignment View</h1>
					<div className='submission-container'>
						<div className='student-submission-view-container'>
							<h2> Student: Peter Parker</h2>
							<div className='submission-text'></div>
							<button>Download</button>
						</div>

						<div className='feedback-container'>
							<h2>Feedback</h2>
							<textarea className='feedback-textarea' />
							<button>Submit</button>
						</div>
					</div>
				</div>
			</AssignmentViewStyle>
		</>
	);
};

const AssignmentViewStyle = styled.div`
	.assignment-view-container {
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
		margin: 20px;
	}
	h2 {
		font-size: 3rem;
		margin: 20px 20px;
		color: #888888;
	}
	.submission-view {
		width: 90%;
		height: 500px;
		margin: 20px;
		border: 1px solid #a9a9a9;
	}
	.student-submission-view-container,
	.feedback-container {
		display: flex;
		flex-direction: column;
		margin: 40px 40px;
		box-shadow: 2px 3px 3px 3px #a9a9a9;
		border-radius: 10px;
	}
	.submission-text {
		margin: 20px;
		width: auto;
		display: block;
		height: 800px;
		border: 1px solid #a9a9a9;
		border-radius: 10px;
	}
	button {
		background-color: #00a3ff;
		font-size: 2rem;
		width: 200px;
		height: 50px;
		color: #ffffff;
		border-radius: 10px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 20px;
	}
	button:hover {
		box-shadow: 3px 3px 3px #a9a9a9;
		cursor: pointer;
	}
	.feedback-textarea {
		margin: 20px;
		height: 100px;
        width: auto;
        border: 1px solid #a9a9a9;
        border-radius: 10px;
        padding: 10px;
        font-size: 1.5rem;
}
	}
`;

export default AssignmentView;
