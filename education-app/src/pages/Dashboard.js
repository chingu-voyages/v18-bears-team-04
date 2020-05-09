import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import config from "../config";

import CreateAssignmentForm from "../components/CreateAssignmentForm";
import CreateClassForm from "../components/CreateClassForm";
import UploadProfileForm from "../components/UploadProfileForm";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";
import ValidationError from "../components/ValidationError";

import styled from "styled-components";
import pencilImg from "../images/iconmonstr-pencil-8-32.png";
import bgImg from "../images/Dashboard-bg.jpg";
import defaultImg from "../images/defaultImg.png";

const Dashboard = (props) => {
	const [userInfo, setUserInfo] = useState(null);
	const [{ currClass }, setClassInfo] = useState({ currClass: null });
	const [{ error }, setError] = useState({ error: null });
	const [
		{ showClassModal, showAssignmentModal, showUploadProfileModal },
		setModal,
	] = useState({
		showClassModal: false,
		showAssignmentModal: false,
		showUploadProfileModal: false,
	});

	function getClassInfo() {
		const classId = TokenService.getClassToken();
		if (classId) {
			ApiService.getClassById(classId).then((res) => {
				setClassInfo({ currClass: res.className });
			});
		}
		return;
	}

	useEffect(() => {
		ApiService.getUserName(props.match.params.userName)
			.then((res) => {
				setUserInfo({ ...res });
				getClassInfo();
			})
			.then((err) => setError({ error: err }));
	}, [props]);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong.  Refresh your page.`;
		}
	};

	const setClassName = (str) => {
		setClassInfo({ currClass: str });
	};

	const handleUploadProfileModal = () => {
		setModal({
			showClassModal: showClassModal,
			showAssignmentModal: showAssignmentModal,
			showUploadProfileModal: !showUploadProfileModal,
		});
	};

	const handleClassModal = (str) => {
		if (str) {
			alert(str);
		}
		setModal({
			showClassModal: !showClassModal,
			showAssignmentModal: showAssignmentModal,
			showUploadProfileModal: showUploadProfileModal,
		});
	};

	const handleAssignmentModal = () => {
		setModal({
			showClassModal: showClassModal,
			showAssignmentModal: !showAssignmentModal,
			showUploadProfileModal: showUploadProfileModal,
		});
	};

	const updateUserProfile = (str) => {
		setUserInfo({ ...userInfo, userProfileLink: str });
		window.location.reload();
	};

	const handleImageError = (e) => (e.target.src = defaultImg);

	let userImage =
		userInfo !== null
			? config.FILE_BASE_URL + userInfo.userProfileLink
			: defaultImg;

	const renderClass =
		currClass === null && userInfo !== null && userInfo.role === "teacher" ? (
			<>
				<button onClick={() => handleClassModal()}>Create Your Class</button>
				<Modal open={showClassModal} onClose={() => handleClassModal()} center>
					<CreateClassForm
						userName={props.match.params.userName}
						handleClassModal={() => handleClassModal()}
						setClassName={(str) => setClassName(str)}
					/>
				</Modal>
			</>
		) : userInfo !== null && userInfo.role === "teacher" ? (
			<>
				<div className='class-title'>
					<h1>{currClass}</h1>
				</div>
				<Link to={`/${props.match.params.userName}/edit-class`}>
					Edit Class
				</Link>
			</>
		) : (
			" "
		);

	return (
		<DashboardStyle bgImg={bgImg}>
			<div className='wrap'>
				<div className='user-info'>
					<div className='prof-img'>
						<img
							onError={(e) => handleImageError(e)}
							src={userImage}
							alt='something that looks like you'
						/>
					</div>
					<button
						className='edit-container'
						onClick={() => handleUploadProfileModal()}
					>
						<img className='edit-img' src={pencilImg} alt='' />
					</button>

					{error && <ValidationError message={errorMessage()} />}
					<p className='user-name'>{props.match.params.userName}</p>
				</div>
				<div className='links'>
					{/* Class Render Only For Teachers */}
					{renderClass}

					<Modal
						open={showUploadProfileModal}
						onClose={() => handleUploadProfileModal()}
						center
					>
						<UploadProfileForm
							email={userInfo != null ? userInfo.email : " "}
							profileImgPreview={userImage}
							handleUploadProfileModal={() => handleUploadProfileModal()}
							updateUserProfile={(str) => updateUserProfile(str)}
							userInfo={userInfo}
						/>
					</Modal>

					{props.match.params.role === "teacher" && (
						<button onClick={() => handleAssignmentModal()}>
							Create An Assignment
						</button>
					)}
					{/* {Dashboard Links} */}
					<Link to={`/${props.match.params.userName}/assignments`}>
						Assignments
					</Link>
					{userInfo !== null && userInfo.role === "student" ? (
						<Link to={`/${props.match.params.userName}/my-grades`}>Grades</Link>
					) : (
						<Link to={`/${props.match.params.userName}/grades`}>Grades</Link>
					)}

					{userInfo !== null && userInfo.role === "student" && (
						<Link to={`/${userInfo.userName}/${userInfo.role}/evaluation`}>
							Class Evaluation
						</Link>
					)}

					<Modal
						open={showAssignmentModal}
						onClose={() => handleAssignmentModal()}
						center
					>
						<CreateAssignmentForm
							className={currClass}
							userName={props.match.params.userName}
							handleAssignmentModal={() => handleAssignmentModal()}
						/>
					</Modal>
				</div>
			</div>
		</DashboardStyle>
	);
};

const DashboardStyle = styled.main`
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
			button:hover .edit {
				display: none;
			}
			.edit-container {
				height: 180px;
				width: 190px;
				position: absolute;
				bottom: 65%;
				opacity: 0;
				z-index: 2;
				transition: 0.3s ease;
			}
			.edit-container:hover {
				opacity: 1;
			}

			.edit-img {
				position: absolute;
				left: 85%;
				bottom: 75%;
			}

			.prof-img:hover,
			.edit-container {
				cursor: pointer;
			}
			.prof-img {
				width: 150px;
				height: 150px;
				border-radius: 50%;
				overflow: hidden;
				z-index: 1;
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

export default Dashboard;
