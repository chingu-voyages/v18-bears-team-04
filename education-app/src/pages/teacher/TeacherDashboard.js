import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import CreateAssignmentForm from "../../components/CreateAssignmentForm";
import styled from "styled-components";
import bgImg from "../../images/Dashboard-bg.jpg";
import STORE from "../../STORE.js";
import exampleImg from "../../images/maria-hill-teacher.jpg";

const TeacherDashboard = () => {
	//temporary
	let user = STORE[1];

	const [{ showModal }, setModal] = useState({ showModal: false });

	const handleModal = () => {
		setModal({ showModal: !showModal });
	};

	//need to add: create button handler, cancel button handler

	return (
		<TeacherDashboardStyle bgImg={bgImg}>
			<div className='wrap'>
				<div className='user-info'>
					<div className='prof-img'>
						<img src={exampleImg} alt='' />
					</div>
					<p className='user-name'>{user.username}</p>
					<p className='user-type'>{user.userType}</p>
				</div>
				<div className='class-title'>
					<h1> {user.className}</h1>
				</div>

				<div className='links'>
					<button onClick={() => handleModal()}>Create An Assignment</button>
					<Link to={`/${user.username}/assignments`}>Assignments</Link>

					<Modal open={showModal} onClose={() => handleModal()} center>
						<CreateAssignmentForm handleModal={() => handleModal()} />
					</Modal>
					<Link to={`/${user.username}/feedback`}>Feedback</Link>
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
