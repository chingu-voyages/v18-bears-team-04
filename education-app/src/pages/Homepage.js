import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import img from "../images/iScholars-logo-medium.png";
import teacherIcon from "../images/teacher.svg";
import studentIcon from "../images/student.svg";
import assignmentIcon from "../images/assignment.svg";
import gradeIcon from "../images/grade.svg";
import feedbackIcon from "../images/feedback.svg";
import fbIcon from "../images/facebook-f-brands.svg";
import instaIcon from "../images/instagram-brands.svg";
import linkedinIcon from "../images/linkedin-in-brands.svg";
// import HowItWorks from './HowItWorks';

const Homepage = () => {
	return (
		<HomepageStyle>
			<div className='first-view'>
				{/* <form id='select-lang' action=''>
					<select name='language'>
						<option value='English'>English</option>
						<option value='Italiano'>Italiano</option>
						<option value='Español'>Español</option>
						<option value='日本語'>日本語</option>
					</select>
				</form> */}
				<div className='home-left'>
					<p className='welcome'>Welcome to iScholars</p>
					<div className='how-work'>
						<table>
							<tbody>
								<tr>
									<td>
										<img src={teacherIcon} alt='' />
										<p>For Teacher</p>
									</td>
									<td></td>
									<td>
										<img src={studentIcon} alt='' />
										<p>For Student</p>
									</td>
								</tr>
								<tr>
									<td>Create assignments</td>
									<td>
										<img src={assignmentIcon} alt='' />
									</td>
									<td>Submit assignment</td>
								</tr>
								<tr>
									<td>Grade your students</td>
									<td>
										<img src={gradeIcon} alt='' />
									</td>
									<td>Get your grde</td>
								</tr>
								<tr>
									<td>Share your feedback</td>
									<td>
										<img src={feedbackIcon} alt='' />
									</td>
									<td>Leave your comment</td>
								</tr>
							</tbody>
						</table>
					</div>
					{/* Icons are from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
					{/* <div className='descriptions'>
						<div className='desc'>
							<p className='user'><i class="fas fa-chalkboard-teacher"> Teachers</i></p>
							<ul>
								<li className='what-you-can'>talk to your students</li>
								<li className='what-you-can'>manage your classes</li>
								<li className='what-you-can'>grade your students</li>
								<li className='what-you-can'>create assignments</li>
								<li className='what-you-can'>evaluate performance</li>
							</ul>
						</div>
						<div className='desc'>
							<p className='user'><i class="fas fa-users"> Students</i></p>
							<ul>
								<li className='what-you-can'>ask questions to your teacher</li>
								<li className='what-you-can'>work on your assignment</li>
								<li className='what-you-can'>get feedback in real time</li>
								<li className='what-you-can'>get your grades</li>
							</ul>
						</div>
					</div> */}
				</div>
				<div className='home-right'>
					<div className='img-wrap'>
						<img src={img} alt='' />
					</div>
					<button className='try-btn'>Try Now</button>
				</div>
			</div>
			<div>{/* <HowItWorks /> */}</div>

			<div className='bottom'>
				<ul className='links'>
					<li>
						<Link to='/aboutus'>About us</Link>{" "}
						<span>
							{" "}
							<a href='/support'>Support</a>
						</span>
					</li>
					{/* <li>
						<a href='/support'>Support</a>
					</li> */}
				</ul>
				<ul className='social-media'>
					<li>
						<a href='/facebook'>
							<img src={fbIcon} alt='facebook' />
						</a>
					</li>
					<li>
						<a href='/instagram'>
							<img src={instaIcon} alt='instagram' />
						</a>
					</li>
					<li>
						<a href='/linkedin'>
							<img src={linkedinIcon} alt='linkedin' />
						</a>
					</li>
				</ul>
			</div>
		</HomepageStyle>
	);
};

const HomepageStyle = styled.div`
	.first-view {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		height: 100vh;
		display: flex;
		padding-top: 60px;
		color: #5d5d5d;
		#select-lang {
			position: absolute;
			right: 20%;
			display: block;
			margin-left: auto;
		}
		.home-left,
		.home-right {
			width: 50%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
		}
		.home-left {
			width: 60%;
			.welcome {
				font-size: 4.5rem;
				text-align: center;
				color: #00a3ff;
				/* animation: 5s ease-out 0s 1 slideInDown;
					-webkit-animation-name: slideInDown; */
			}
			.how-work {
				table {
					width: 100%;
					tr {
						width: 80%;
						margin: 0 auto 20px;
						display: flex;
						justify-content: center;
						align-items: center;
						td {
							text-align: center;
							display: block;
							font-size: 2rem;
							&:nth-child(odd) {
								width: 40%;
								img {
									display: block;
									width: 60%;
									margin: 0 auto;
								}
							}
							&:nth-child(even) {
								width: 10%;
								img {
									display: block;
									margin: 0 auto;
									width: 100%;
								}
							}
							p {
								font-size: 2.4rem;
							}
						}
					}
				}
			}
			.descriptions {
				width: 80%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.desc {
					width: 50%;

					.user {
						font-size: 2rem;
						i.fas.fa-chalkboard-teacher {
							font-size: 30px;
							margin: 8px 20px;
						}
						i.fas.fa-users {
							font-size: 30px;
							margin: 8px 20px;
						}
					}
					ul {
						margin: 30px auto 0;
						.what-you-can {
							font-size: 2rem;
							display: flex;
							align-items: center;
							margin-bottom: 8px;

							&::before {
								display: block;
								content: "*";
								width: 15px;
								margin-right: 10px;
								color: #00a3ff;
								margin-top: 6px;
							}
						}
					}
				}
			}
		}
		.home-right {
			width: 40%;
			align-items: center;
			.img-wrap {
				width: 100%;
				/* position: relative; */
				overflow: hidden;
				img {
					width: 90%;
				}
			}
			.try-btn {
				width: 40%;
				height: 50px;
				background-color: #00a3ff;
				color: #fff;
				font-size: 2rem;
				border-radius: 10px;
				cursor: pointer;
				transition: 0.1s;
				&:hover {
					border: 2px solid #00a3ff;
					background-color: #fff;
					color: #00a3ff;
					line-height: 46px;
				}
			}
		}
	}

	.bottom {
		width: 100%;
		height: 80px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.links {
			margin-left: 30px;
			li {
				height: 40px;
				line-height: 40px;
				font-size: 2rem;
			}
			span {
				height: 40px;
				line-height: 40px;
				font-size: 2rem;
				padding-left: 25px;
			}
		}
		.social-media {
			margin-right: 30px;
			display: flex;
			li {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: #afafaf;
				margin-right: 10px;

				a {
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						height: 70%;
					}
				}
			}
		}
	}
	/*
	Screen size for Home Page form */
	@media (max-width: 600px) {
		.first-view {
			height: 80vh;
			overflow: hidden;
		}
		.first-view .home-left .welcome {
			font-size: 3.5rem;
		}
		.first-view .home-left {
			width: 100%;
		}
		.first-view .home-right {
			display: none;
		}
	}

	@keyframes slideInDown {
		from {
			-webkit-transform: translate3d(0, -90%, 0);
			transform: translate3d(0, -90%, 0);
			visibility: visible;
		}

		to {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
	}
`;

export default Homepage;
