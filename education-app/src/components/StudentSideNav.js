import React from "react";
import styled from "styled-components";

import bgImg from "../images/Dashboard-bg.jpg";

const StudentSideNav = () => {
	return (
		<StudentSideNavStyle>
			<div className='wrap'>
				<div className='userInfo'>
					<div className='prof-img'>
						{/* <img src={exampleImg} alt='' /> */}
					</div>
					<p className='user-name'>UserName</p>
					<p className='user-type'>Student</p>
				</div>
				<div className='links'>
					<a>Assignments</a>
					<a>Grades</a>
				</div>
			</div>
		</StudentSideNavStyle>
	);
};

const StudentSideNavStyle = styled.div`
	width: 22%;
	height: 100vh;
	padding-top: 60px;
	position: absolute;
	background-color: #fff;
	background-image: url(${bgImg});
	background-size: cover;
	background-position: 60% 0;
	.wrap {
		width: 100%;
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

export default StudentSideNav;
