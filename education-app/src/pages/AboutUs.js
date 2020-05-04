import React from "react";
import styled from "styled-components";

import bgImg from "../images/aboutUsBg.jpg";
import logo from "../images/iScholars-logo-large.png";

import giusImg from "../images/gius.png";
import chuksImg from "../images/chuks.jpeg";
import liamImg from "../images/liam.jpg";
import yutoImg from "../images/yuto.jpg";
import joanneImg from "../images/joanne.jpg";

import Italy from "../images/Italy.svg";
import Nigeria from "../images/Nigeria.svg";
import India from "../images/India.svg";
import Japan from "../images/Japan.svg";

const AboutUs = () => {
	const members = [
		{
			name: "Giuseppe",
			job: "Product Owner",
			icon: giusImg,
			flag: Italy,
			nationality: "Italy",
		},
		{
			name: "Joanne",
			job: "Full Stack Developer",
			icon: joanneImg,
		},
		{
			name: "Chuks",
			job: "Backend Developer",
			icon: chuksImg,
			flag: Nigeria,
			nationality: "Nigeria",
		},
		{
			name: "Liam",
			job: "Backend Developer",
			icon: liamImg,
			flag: India,
			nationality: "India",
		},
		{
			name: "Yuto",
			job: "UI Developer",
			icon: yutoImg,
			flag: Japan,
			nationality: "Japan",
		},
		{
			name: "Dummy",
			job: "Dummy",
			icon: null,
		},
	];

	const team = members.map((member, i) => {
		return (
			<div key={i} className='member'>
				<div className='img-wrap'>
					<img src={member.icon} alt={member.name} />
				</div>
				<h4 className='name'>{member.name} </h4>
				<p className='job'>{member.job}</p>
				<img className='flag' src={member.flag} alt={member.nationality} />
			</div>
		);
	});

	return (
		<AboutUsStyle bgImg={bgImg}>
			<div className='top'>
				<h2>About Us</h2>
			</div>
			<div className='big-logo'>
				<img src={logo} alt='iScholars-Logo' />
			</div>
			<div className='vision'>
				<div className='wrap'>
					<h3>Vision</h3>
					<p>
						iScholars has been built to empower a worldwide community of
						teachers and students and improve their communication with more
						transparency.
					</p>
				</div>
			</div>
			<div className='team'>
				<div className='wrap'>
					<h3>Meet the Team</h3>
					<p className='desc'>
						The team consists of members from various countries.
					</p>
					<div className='members'>{team}</div>
				</div>
			</div>
		</AboutUsStyle>
	);
};

const AboutUsStyle = styled.div`
	width: 100%;
	padding-top: 60px;
	.top {
		width: 100%;
		height: 40vh;
		background-image: url(${({ bgImg }) => bgImg});
		background-size: cover;
		background-position-y: 40%;
		h2 {
			width: 100%;
			height: 100%;
			line-height: 40vh;
			text-align: center;
			font-size: 5rem;
			color: #fff;
			background-color: #00a2ffbf;
		}
	}
	.big-logo {
		width: 100%;
		height: 40vh;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			height: 70%;
		}
	}
	.vision,
	.team {
		width: 100%;
		padding: 70px 0;
		.wrap {
			width: 80%;
			margin: 0 auto;
			h3 {
				width: 100%;
				font-size: 4.2rem;
			}
		}
	}
	.vision {
		background-color: #00a3ff;
		color: #fff;
		p {
			font-size: 3rem;
			line-height: 50px;
			letter-spacing: 1.5px;
			margin-top: 50px;
		}
	}
	.team {
		color: #00a3ff;
		.desc {
			font-size: 2.5rem;
			margin-top: 20px;
		}
		.members {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.member {
				width: 30%;
				margin-top: 60px;
				text-align: center;
				&:last-child {
					opacity: 0;
				}
				.img-wrap {
					width: 160px;
					height: 160px;
					margin: 0 auto;
					border: 2px solid;
					border-radius: 50%;
					overflow: hidden;
					img {
						width: 100%;
					}
				}
				.name {
					margin-top: 13px;
					font-size: 2.5rem;
					line-height: 30px;
				}
				.job {
					font-size: 1.9rem;
					color: #5d5d5d;
					margin-top: 5px;
				}
				.flag {
					height: 25px;
					margin-top: 5px;
					box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
				}
			}
		}
	}
`;

export default AboutUs;
