import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import bgImg from "../images/Dashboard-bg.jpg";
import defaultImg from "../images/defaultImg.png";
import config from "../../src/config";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";
import ValidationError from "./ValidationError";

const SideNav = (props) => {
	const [userInfo, setUserInfo] = useState(null);
	const [{ error }, setError] = useState({ error: null });

	const getUserInfo = (props) => {
		const userId = TokenService.getAuthToken();
		ApiService.getUsers()
			.then((res) => {
				const dbUser = res.filter((a) => a._id === userId);
				setUserInfo(...dbUser);
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	const errorMessage = () => {
		if (error != null) {
			return `Something went wrong.`;
		}
	};

	const userImage =
		userInfo === null || !userInfo.userProfileLink
			? defaultImg
			: config.IMG_BASE_URL + userInfo.userProfileLink;

	return (
		<SideNavStyle>
			<div className='wrap'>
				<div className='userInfo'>
					<div className='prof-img'>
						<img src={userImage} alt='something that looks like you' />
					</div>
					{error && <ValidationError message={errorMessage()} />}

					<p className='user-name'>{userInfo !== null && userInfo.userName}</p>

					<p className='user-type'>{userInfo !== null && userInfo.role}</p>
				</div>
				<div className='links'>
					{userInfo !== null && userInfo.role === "teacher" ? (
						<Link to={`/${userInfo.userName}/${userInfo.role}/dashboard`}>
							Dashboard
						</Link>
					) : (
						userInfo !== null && (
							<Link to={`/${userInfo.userName}/${userInfo.role}/dashboard`}>
								Dashboard
							</Link>
						)
					)}
					{userInfo !== null && (
						<Link to={`/${userInfo.userName}/assignments`}>Assignments</Link>
					)}
					{userInfo !== null && userInfo.role === "teacher" ? (
						<Link to={`/${userInfo.userName}/grades`}>Grades</Link>
					) : (
						userInfo !== null && (
							<Link to={`/${userInfo.userName}/my-grades`}>Grades</Link>
						)
					)}
					{userInfo !== null && userInfo.role === "student" && (
						<Link to={`/${userInfo.userName}/${userInfo.role}/evaluation`}>
							Class Evaluation
						</Link>
					)}
				</div>
			</div>
		</SideNavStyle>
	);
};

const SideNavStyle = styled.div`
	width: 250px;
	height: 100vh;
	position: fixed;
	background-color: #fff;
	background-image: url(${bgImg});
	background-size: cover;
	background-position: 60% 0;
	.wrap {
		height: 100%;
		background-color: #00a2ffbf;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		color: #fff;
		.userInfo {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.prof-img {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			.user-name {
				font-size: 2rem;
				margin-top: 10px;
			}
			.user-type {
				font-size: 1.6rem;
				margin-top: 10px;
			}
		}
		.links {
			display: flex;
			flex-direction: column;
			a {
				font-size: 2rem;
				text-align: center;
				margin-bottom: 30px;
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

export default SideNav;
