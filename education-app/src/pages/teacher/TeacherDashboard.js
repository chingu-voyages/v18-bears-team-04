import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

import CreateAssignmentForm from "../../components/CreateAssignmentForm";
import EditClassForm from "../../components/EditClassForm";
import CreateClassForm from "../../components/CreateClassForm";
import UploadProfileForm from "../../components/UploadProfileForm";
import ApiService from "../../services/api-services";
import TokenService from "../../services/token-service";
import ValidationError from "../../components/ValidationError";
import ScholarContext from "../../ScholarContext";

import styled from "styled-components";
import pencilImg from "../../images/iconmonstr-pencil-8-32.png";
import bgImg from "../../images/Dashboard-bg.jpg";
import exampleImg from "../../images/maria-hill-teacher.jpg";

const TeacherDashboard = (props) => {
	//temporary

	const context = useContext(ScholarContext);
	const [userInfo, setUserInfo] = useState(null);
	const [{ currClass }, setClassInfo] = useState({ currClass: null });
	const [{ error }, setError] = useState({ error: false });
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
		ApiService.getUserName(props.match.params.userName).then((res) => {
			setUserInfo({ ...res });
			getClassInfo();
		});
	}, [props.match]);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong.  Refresh your page.`;
		}
	};

	const setClassName = (str) => {
		setClassInfo({ currClass: str });
	};

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
			<>
				<div className='class-title'>
					<h1>{currClass}</h1>
				</div>
				<button onClick={() => handleClassModal()}>Edit Class</button>

				<Modal open={showClassModal} onClose={() => handleClassModal()} center>
					<EditClassForm
						userName={props.match.params.userName}
						handleClassModal={() => handleClassModal()}
						setClassName={(str) => setClassName(str)}
					/>
				</Modal>
			</>
		);
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
		});
	};

	const user = userInfo !== null ? userInfo : "";

	const handleAssignmentModal = () => {
		setModal({
			showClassModal: showClassModal,
			showAssignmentModal: !showAssignmentModal,
		});
	};

	console.log(user.userProfileLink);

	return (
		<TeacherDashboardStyle bgImg={bgImg}>
			<div className='wrap'>
				<div className='user-info'>
					{/* <img className='edit-img' src={pencilImg} alt='' /> */}
					<div className='prof-img'>
						<img
							src={process.env.PUBLIC_URL + "/5ea0ca626ec8d40b3c1093e8.jpeg"}
							alt=''
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
					<p className='user-type'>{props.match.params.userType}</p>
				</div>
				<div className='links'>
					{/* Class Render Only For Teachers */}
					{renderClass()}
					<button onClick={() => handleUploadProfileModal()}>
						Update Profile
					</button>

					<Modal
						open={showUploadProfileModal}
						onClose={() => handleUploadProfileModal()}
						center
					>
						<UploadProfileForm
							email={userInfo != null ? userInfo.email : null}
							userName={props.match.params.userName}
							handleUploadProfileModal={() => handleUploadProfileModal()}
						/>
					</Modal>

					<button onClick={() => handleAssignmentModal()}>
						Create An Assignment
					</button>
					{/* {Dashboard Links} */}
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
							className={currClass}
							userName={props.match.params.userName}
							handleAssignmentModal={() => handleAssignmentModal()}
						/>
					</Modal>
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

export default TeacherDashboard;
