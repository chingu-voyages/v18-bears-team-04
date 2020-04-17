import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

import CreateAssignmentForm from "../../components/CreateAssignmentForm";
import CreateClassForm from "../../components/CreateClassForm";
import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";
import STORE from "../../STORE";

import styled from "styled-components";
import bgImg from "../../images/Dashboard-bg.jpg";
import exampleImg from "../../images/maria-hill-teacher.jpg";

const TeacherDashboard = (props) => {
	//temporary
	let user = STORE[1];

	const [{ currClass }, setClassInfo] = useState({ currClass: null });
	const [{ error }, setError] = useState({ error: false });
	const [{ showClassModal, showAssignmentModal }, setModal] = useState({
		showClassModal: false,
		showAssignmentModal: false,
	});

	function getUserInfo() {
		ApiService.getClassById(TokenService.getClassToken())
			.then((res) => {
				setClassInfo({ currClass: res.className });
			})
			.catch((err) => setError({ error: err }));
	}

	useEffect(() => {
		getUserInfo();
	}, []);

	const setClassName = (str) => {
		setClassInfo({ currClass: str });
	};

	// const filteredClass =
	// 	currClass != null
	// 		? currClass.filter((i) => i.teacherName === props.match.params.userName)
	// 		: null;

	console.log(currClass);

	const renderClass = () => {
		if (currClass === null) {
			return (
				<>
					<button onClick={() => handleClassModal()}>Create Your Class</button>
					<Modal
						open={showClassModal}
						onClose={() => handleClassModal()}
						center
					>
						<CreateClassForm
							userName={props.match.params.userName}
							handleClassModal={() => handleClassModal()}
							setClassName={(str) => setClassName(str)}
						/>
					</Modal>
				</>
			);
		}
		return (
			<div className='class-title'>
				<h1>{currClass}</h1>
			</div>
		);
	};

	const handleClassModal = () => {
		setModal({
			showClassModal: !showClassModal,
			showAssignmentModal: showAssignmentModal,
		});
	};

	const handleAssignmentModal = () => {
		setModal({
			showClassModal: showClassModal,
			showAssignmentModal: !showAssignmentModal,
		});
	};

	return (
		<TeacherDashboardStyle bgImg={bgImg}>
			<div className='wrap'>
				<div className='user-info'>
					<div className='prof-img'>
						<img src={exampleImg} alt='' />
					</div>
					<p className='user-name'>{props.match.params.userName}</p>
					<p className='user-type'>{user.userType}</p>
				</div>
				<div className='links'>
					{/* {filteredClass === null || filteredClass.length === 0 ? (
						<>
							<button onClick={() => handleClassModal()}>
								Create Your Class
							</button>
							<Modal
								open={showClassModal}
								onClose={() => handleClassModal()}
								center
							>
								<CreateClassForm
									userName={props.match.params.userName}
									handleClassModal={() => handleClassModal()}
								/>
							</Modal>
						</>
					) : (
						<div className='class-title'>
							<h1> {filteredClass[0].className}</h1>
						</div>
					)} */}
					{renderClass()}
					<button onClick={() => handleAssignmentModal()}>
						Create An Assignment
					</button>
					<Link to={`/${props.match.params.userName}/grades`}>Grades</Link>
					<Link to={`/${props.match.params.userName}/assignments`}>
						Assignments
					</Link>

					<Modal
						open={showAssignmentModal}
						onClose={() => handleAssignmentModal()}
						center
					>
						<CreateAssignmentForm
							userName={props.match.params.userName}
							handleAssignmentModal={() => handleAssignmentModal()}
						/>
					</Modal>
					<Link to={`/${props.match.params.userName}}/feedback`}>Feedback</Link>
				</div>
			</div>
		</TeacherDashboardStyle>
	);
};

const TeacherDashboardStyle = styled.main`
	padding-top: 60px;
	width: 100%;
	height: 100vh;
	background-image: url(${({ bgimg }) => bgImg});
	background-size: cover;
	z-index: 2;
	.wrap {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		background-color: #00a2ffbf;
		.user-info {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #fff;
			.prof-img {
				width: 150px;
				height: 150px;
				border-radius: 50%;
				overflow: hidden;
				img {
					height: 100%;
				}
			}
			.user-name {
				font-size: 2.8rem;
				margin-top: 10px;
			}
			.user-type {
				font-size: 2rem;
				margin-top: 8px;
			}
		}
		.class-title {
			text-align: center;
			font-size: 8rem;
			color: #ffffff;
			margin: 20px;
		}
		.links {
			display: flex;
			flex-direction: column;

			button,
			a {
				text-align: center;
				font-size: 2.6rem;
				margin-bottom: 30px;
				color: #ffffff;
				transition: 0.3s;
				&:last-child {
					margin-bottom: 0;
				}
				&:hover {
					cursor: pointer;
					opacity: 0.7;
				}
			}
		}
	}
`;

export default TeacherDashboard;
