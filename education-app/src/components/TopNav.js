import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import "react-responsive-modal/styles.css";
import styled from "styled-components";
import bellIcon from "../images/bell-solid.svg";

const TopNav = () => {
	const [{ loggedIn, showModal, formType }, setForm] = useState({
		loggedIn: false,
		showModal: false,
		formType: "",
	});

	const handleClick = (e) => {
		const { value } = e.target;
		setForm({ formType: value, showModal: true });
	};

	const handleLogIn = (str, username) => {
		str === "Log In" || str === "Sign Up"
			? //check user in db and update to loggedIn = true
			  setForm({ loggedIn: true, showModal: false })
			: // : value === "Sign Up"
			  // ? //set post new user and update to loggedIn = true
			  setForm({ loggedIn: false });
	};

	return (
		<NavStyle>
			<h1>iScholars</h1>
			<Modal
				open={showModal}
				onClose={() => setForm({ showModal: false })}
				center
			>
				{formType === "Sign Up" ? (
					<SignUpForm
						formType={formType}
						handleLogIn={(e, username) => handleLogIn(e, username)}
					/>
				) : formType === "Log In" ? (
					<LogInForm
						formType={formType}
						handleLogIn={(e, username) => handleLogIn(e, username)}
					/>
				) : null}
			</Modal>
			<nav className='top-nav-menu'>
				<ul>
					{loggedIn ? (
						<>
							<button className='logout-btn'>Log Out</button>
							<button className='notif-btn'>
								<img src={bellIcon} alt='notification' />
							</button>
						</>
					) : (
						<>
							<button
								className='login-btn'
								onClick={(e) => handleClick(e)}
								value='Log In'
							>
								Log In
							</button>
							<button
								className='signup-btn'
								onClick={(e) => handleClick(e)}
								value='Sign Up'
							>
								Sign Up
							</button>
						</>
					)}
				</ul>
			</nav>
		</NavStyle>
	);
};

const NavStyle = styled.header`
	position: fixed;
	width: 100%;
	height: 60px;
	padding: 0 60px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 3px solid #00a3ff;
	z-index: 100;
	h1 {
		font-size: 4rem;
		color: #00a3ff;
	}
	.top-nav-menu {
		ul {
			display: flex;
			align-items: center;
			button {
				width: 180px;
				height: 40px;
				text-align: center;
				font-size: 2rem;
				line-height: 40px;
				margin-right: 20px;
				border-radius: 10px;
				cursor: pointer;
				&:last-child {
					margin-right: 0;
				}
			}
			.logout-btn {
				background-color: #00a3ff;
				color: #fff;
			}
			.notif-btn {
				width: 30px;
				height: 30px;
				background-color: #fff;
				img {
					height: 100%;
				}
			}
			.login-btn {
				color: #00a3ff;
			}
			.signup-btn {
				background-color: #00a3ff;
				color: #fff;
			}
		}
	}
`;

export default TopNav;
