import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bgImg from "../../images/Dashboard-bg.jpg";
import exampleImg from "../../images/ProfExample.jpg";

const StudentDashboard = (props) => {
	return (
		<StudentDashboardStyle>
			<div className='wrap'>
				<div className='user-info'>
					<div className='prof-img'>
						<img src={exampleImg} alt='' />
					</div>
					<p className='user-name'>{props.match.params.userName}</p>
				</div>
				<div className='links'>
					<Link>Assignments</Link>
					<Link>Grades</Link>
				</div>
			</div>
		</StudentDashboardStyle>
	);
};

const StudentDashboardStyle = styled.main`
	padding-top: 60px;
	width: 100%;
	height: 100vh;
	background-image: url(${bgImg});
	background-size: cover;
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
		.links {
			display: flex;
			flex-direction: column;
			a {
				text-align: center;
				font-size: 2.6rem;
				color: #fff;
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

export default StudentDashboard;
