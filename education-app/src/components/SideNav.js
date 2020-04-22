import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import bgImg from "../images/Dashboard-bg.jpg";
import exampleImgStudent from "../images/ProfExample.jpg";
import exampleImgTeacher from "../images/maria-hill-teacher.jpg";

import ApiService from "../services/api-services";
import TokenService from "../services/token-service";

const SideNav = (props) => {
	const user = {
		userName: "",
		userRole: "",
	};
	const [userInfo, setUserInfo] = useState({ user });
	const [{ error }, setError] = useState({ error: null });
	const id = TokenService.getAuthToken();

	const getUserInfo = (props) => {
		const userId = TokenService.getAuthToken();
		ApiService.getUsers()
			.then((res) => {
				const dbUser = res.filter((a) => a._id === userId);
				setUserInfo({
					userName: dbUser[0].userName,
					userRole: dbUser[0].role,
					userId: userId,
				});
			})
			.catch((err) => setError({ error: err }));
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<SideNavStyle>
			<div className='wrap'>
				<div className='userInfo'>
					<div className='prof-img'>
						{userInfo !== undefined && userInfo.userRole === "teacher" ? (
							<img src={exampleImgTeacher} alt='' />
						) : (
							<img src={exampleImgStudent} alt='' />
						)}
					</div>

					<p className='user-name'>
						{userInfo !== undefined && userInfo.userName}
					</p>

					<p className='user-type'>
						{userInfo !== undefined && userInfo.userRole}
					</p>
				</div>
				<div className='links'>
					{userInfo !== undefined && userInfo.userRole === "teacher" ? (
						<Link to={`/${userInfo.userName}/dashboard`}>Dashboard</Link>
					) : (
						<Link to={`/${userInfo.userName}/studentdashboard`}>Dashboard</Link>
					)}

					<Link to={`/${userInfo.userName}/assignments`}>Assignments</Link>
					{userInfo !== undefined && userInfo.userRole === "teacher" ? (
						<Link to={`/${userInfo.userName}/grades`}>Grades</Link>
					) : (
						<Link to={`/${userInfo.userName}/my-grades`}>Grades</Link>
					)}

					{userInfo !== undefined && userInfo.userRole === "teacher" && (
						<Link to={`/${userInfo.userName}/feedback`}>Feedback</Link>
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
