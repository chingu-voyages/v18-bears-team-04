import React from "react";
import styled from "styled-components";

import bgImg from "../images/Dashboard-bg.jpg";
import exampleImg from "../images/ProfExample.jpg";

const SideNav = (props) => {
	const displayedLinks = props.links.map((l) => <a key={l + "1"}>{l}</a>);
	return (
		<SideNavStyle>
			<div className='wrap'>
				<div className='userInfo'>
					<div className='prof-img'>
						<img src={exampleImg} alt='' />
					</div>
					<p className='user-name'>{props.userName}</p>
					<p className='user-type'>{props.role}</p>
				</div>
				<div className='links'>{displayedLinks}</div>
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
