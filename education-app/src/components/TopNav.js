import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import ModalForm from "./ModalForm";
import "react-responsive-modal/styles.css";
import styled from "styled-components";

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

	return (
		<NavStyle>
			<h1>iScholars</h1>
			<Modal
				open={showModal}
				onClose={() => setForm({ showModal: false })}
				center
			>
				<ModalForm formType={formType} />
			</Modal>
			<nav className='top-nav-menu'>
				<ul>
					{loggedIn ? (
						<>
							<li>My Page</li>
							<li>My Profile</li>
							<li>Log Out</li>
						</>
					) : (
						<>
							<button onClick={(e) => handleClick(e)} value='signUp'>
								Sign Up
							</button>
							<button onClick={(e) => handleClick(e)} value='logIn'>
								Log In
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
	background-color: #efefef;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 100;
	h1 {
		font-size: 4rem;
	}
	.top-nav-menu {
		ul {
			display: flex;
			li,
			button {
				width: 180px;
				height: 40px;
				text-align: center;
				font-size: 2rem;
				line-height: 40px;
				margin-right: 20px;
				background-color: #afafaf;
				cursor: pointer;
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
`;

export default TopNav;
