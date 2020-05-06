import React, { useState, useEffect } from "react";

import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";

import SideNav from "../../components/SideNav";
import ValidationError from "../../components/ValidationError";

import styled from "styled-components";

const Evaluation = (props) => {
	const [{ error }, setError] = useState({ error: null });
	const [assignments, setAssignments] = useState(null);

	const [classInfo, setClasses] = useState(null);
	const userId = TokenService.getAuthToken();

	const getAllApiInfo = (props) => {
		Promise.all([
			ApiService.getClasses(),
			ApiService.getAssignments(),
			ApiService.getUserName(props.match.params.userName),
		])
			.then((res) => {
				if (res.length === 0) {
					setError({ error: `Looks like you don't have any assignments yet.` });
				}

				const filteredClasses = res[0].filter((a) =>
					res[1].some((b) => a._id === b.classId)
				);
				const filteredAssignments = res[1].filter((a) =>
					res[0].some((b) => a.classId === b._id)
				);

				setClasses(filteredClasses);
				setAssignments(filteredAssignments);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getAllApiInfo(props);
	}, [props]);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong. Try again later`;
		}
	};

	const makeFilteredAssignments = (currentAssignments) => {
		let list = [];
		let assignmentList = [];

		//combine lists and keys
		for (let i = 0; i < currentAssignments.length; i++) {
			for (let x = 0; x < currentAssignments[i].length; x++) {
				list.push(currentAssignments[i][x]);
			}
		}

		//make a list based on assignment results
		list.map((a) =>
			a.assignmentResults.forEach((b) =>
				assignmentList.push({
					...b,
					title: a.title,
					assignmentId: a._id,
					className: a.className,
				})
			)
		);

		//list specific to this user
		const filteredList = assignmentList.filter(
			(a) => a.studentId === userId && a.status === "GRADED"
		);

		return filteredList;
	};

	const combinedInfo =
		assignments != null &&
		assignments.map((a) => {
			for (let i = 0; i < classInfo.length; i++) {
				if (classInfo[i]._id === a.classId) {
					return { ...classInfo[i], ...a };
				}
			}
			return a;
		});

	const studentClass =
		assignments != null && classInfo.filter((a) => a.studentIds);

	const currentAssignments =
		assignments != null &&
		studentClass
			.filter((c) => c.studentIds.find((b) => b === userId))
			.map((a) => a._id)
			.map((a) => combinedInfo.filter((b) => b.classId === a));

	const gradedAssignments =
		assignments != null && makeFilteredAssignments(currentAssignments);

	const formattedGrades = (item) => {
		let collection = {};

		item.forEach(function (a) {
			if (!collection.hasOwnProperty(a.className)) {
				collection[a.className] = [a.grade];
			} else {
				collection[a.className] = [...collection[a.className], a.grade];
			}
		});

		let average = Object.values(collection).map(
			(arr) => arr.reduce((a, b) => a + b, 0) / arr.length
		);

		let averageWithClass = Object.keys(collection).map(function (a, index) {
			//assuming object keys and values are in the same order
			return { className: a, score: average[index] };
		});

		return averageWithClass;
	};

	const classGrades = assignments != null && formattedGrades(gradedAssignments);

	const displayedEvaluation =
		assignments != null &&
		classGrades.map((evl, i) => {
			let scoreColor;
			if (evl.score >= 90) {
				scoreColor = "#FF0000";
			} else if (evl.score >= 80) {
				scoreColor = "#FF5C00";
			} else if (evl.score >= 70) {
				scoreColor = "#FFD600";
			} else if (evl.score >= 60) {
				scoreColor = "#17A300";
			} else {
				scoreColor = "#0057FF";
			}

			return (
				<div className='evaluation' key={i}>
					<p className='class'>{evl.className}</p>
					<div className='score' style={{ backgroundColor: scoreColor }}>
						<p>{evl.score}</p>
					</div>
				</div>
			);
		});

	return (
		<>
			<SideNav />
			<EvaluationStyle>
				<div className='wrap'>
					<h2 className='page-title'>Assignment Grade</h2>
					<h3>Your average grade per class</h3>
					{error !== null && <ValidationError message={errorMessage()} />}
					<div className='eval-table'>{displayedEvaluation}</div>
				</div>
			</EvaluationStyle>
		</>
	);
};

const EvaluationStyle = styled.div`
	padding: 60px 0;
	padding-left: 250px;
	width: 100vw - 250px;
	height: 100%;
	margin-left: auto;
	.wrap {
		width: 90%;
		margin: 0 auto;
		color: #5e5e5e;
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
	.eval-table {
		width: 100%;
		margin-top: 40px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.evaluation {
			width: 45%;
			margin-bottom: 20px;
			border-radius: 10px;
			position: relative;
			box-shadow: 0 5px 20px #0000001f;
			&:before {
				content: "";
				display: block;
				margin-top: 150px;
			}
			.class,
			.score {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			.class {
				font-size: 2.4rem;
				left: 10%;
			}
			.score {
				right: 10%;
				font-size: 3.4rem;
				width: 100px;
				height: 100px;
				border-radius: 50%;
				text-align: center;
				line-height: 100px;
				color: #fff;
			}
		}
	}
`;

export default Evaluation;
