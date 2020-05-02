import React from "react";

import styled from "styled-components";

const StudentGrade = () => {
	// temporary
	let score = 82;

	let scoreColor;
	if (score >= 90) {
		scoreColor = "#FF0000";
	} else if (score >= 80) {
		scoreColor = "#FF5C00";
	} else if (score >= 70) {
		scoreColor = "#FFD600";
	} else if (score >= 60) {
		scoreColor = "#17A300";
	} else {
		scoreColor = "#0057FF";
	}

	return (
		<StudentGradeStyle scoreColor={scoreColor}>
			<div className='wrap'>
				<h2 className='page-title'>Assignment Grade</h2>
				<div className='top'>
					<h3>Asignment Title - ClassName?</h3>
					<div className='status'>add icon later</div>
					<select>
						<option>Select Assignment</option>
					</select>
				</div>
				<div className='your-score'>
					<h4>Score</h4>
					<div className='score'>{score}</div>
				</div>
				<div className='feedback-from'>
					<h4>Feedback from the Teacher</h4>
					<p>God of thunder</p>
				</div>
				<div className='feedback-for'>
					<h4>Feedback for the Teacher</h4>
					<form>
						<textarea />
						<button className='submit-btn'>SUBMIT</button>
					</form>
				</div>
			</div>
		</StudentGradeStyle>
	);
};

const StudentGradeStyle = styled.div`
	padding: 60px 0;
	padding-left: 250px;
	width: 100vw - 250px;
	height: 100%;
	margin-left: auto;
	.wrap {
		width: 90%;
		margin: 0 auto;
		color: #5f5f5f;
	}
	.page-title {
		font-size: 3.8rem;
		margin-top: 30px;
		color: #00a3ff;
	}
	h3 {
		font-size: 3rem;
		margin-top: 10px;
		color: #5e5e5e;
	}
	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		select {
			width: 200px;
		}
	}

	.your-score,
	.feedback-from,
	.feedback-for {
		margin-top: 40px;
		h4 {
			font-size: 2rem;
		}
	}

	.your-score {
		.score {
			width: 100px;
			height: 100px;
			margin-top: 10px;
			line-height: 100px;
			border-radius: 50%;
			text-align: center;
			font-size: 3.4rem;
			color: #fff;
			background-color: ${({ scoreColor }) => scoreColor};
		}
	}
	.feedback-from {
		width: 100%;
		p {
			height: 200px;
			margin-top: 10px;
			border: 1px solid #5f5f5f;
			border-radius: 10px;
			padding: 8px;
			font-size: 1.2rem;
		}
	}
	.feedback-for {
		width: 100%;
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			margin-top: 10px;
			textarea {
				width: 100%;
				padding: 8px;
				height: 200px;
				border: 1px solid #5f5f5f;
				border-radius: 10px;
				outline: 0;
			}
			.submit-btn {
				width: 200px;
				height: 40px;
				border-radius: 10px;
				margin-top: 20px;
				font-size: 2rem;
				color: #fff;
				background-color: #00a3ff;
			}
		}
	}
`;

export default StudentGrade;
