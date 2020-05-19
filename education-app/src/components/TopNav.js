import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import TokenService from "../services/token-service";
import ScholarContext from "../ScholarContext";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import "react-responsive-modal/styles.css";
import styled from "styled-components";
// import bellIcon from "../images/bell-solid.svg";
import Logo from "../images/iScholars-logo-small.png";

const TopNav = (props) => {
	const context = useContext(ScholarContext);
	const [{ loggedIn, showModal, formType }, setForm] = useState({
		loggedIn: false,
		showModal: false,
		formType: "",
	});
	const [user, setUser] = useState(null);

	const history = useHistory();

	const handleClick = (e) => {
		const { value } = e.target;
		setForm({ formType: value, showModal: true });
	};

	const handleLogIn = (response) => {
		setForm({ loggedIn: true, showModal: false });
		setUser(response);

		if (response.role === "teacher") {
			context.saveUser(response);
			history.push(`/${response.userName}/${response.role}/dashboard`);
		} else {
			context.saveUser(response);
			history.push(`/${response.userName}/${response.role}/dashboard`);
		}
	};

	const handleLogOut = () => {
		setForm({ loggedIn: false });
		TokenService.clearAuthToken();
		TokenService.clearClassToken();
		history.push(`/`);
	};

	const renderLogIn = () => {
		return (
			<>
				<button
					className='login-btn nav-item'
					onClick={(e) => handleClick(e)}
					value='Log In'
				>
					Log In
				</button>
				<button
					className='signup-btn nav-item'
					onClick={(e) => handleClick(e)}
					value='Sign Up'
				>
					Sign Up
				</button>
			</>
		);
	};

	const renderLogOut = () => {
		return (
			<>
				{user !== null && (
					<button>
						<Link to={`/${user.userName}/${user.role}/dashboard`}>
							Dashboard
						</Link>
					</button>
				)}
				<button className='logout-btn' onClick={() => handleLogOut()}>
					Log Out
				</button>
				{/* <button className='notif-btn'>
					<img src={bellIcon} alt='notification' />
				</button> */}
				{/* Saved for next round */}
			</>
		);
	};

	const renderForm = (str) => {
		if (str === "Sign Up") {
			return (
				<SignUpForm
					formType={formType}
					handleLogIn={(str) => handleLogIn(str)}
				/>
			);
		} else if (str === "Log In") {
			return (
				<LogInForm
					formType={formType}
					handleLogIn={(str) => handleLogIn(str)}
				/>
			);
		}
	};

	return (
		<NavStyle>
			<Link to={`/`}>
				<img className='app-logo' src={Logo} alt='APP logo' />
			</Link>
			<Modal id="modal-form"
				open={showModal}
				onClose={() => setForm({ showModal: false })}
				center
			>
				{!formType ? null : renderForm(formType)}
			</Modal>
			<div id="menuToggle">
      <input type="checkbox" />
      <span />
      <span />
      <span />
				<ul id="menu">
					{loggedIn || TokenService.hasAuthToken()
						? renderLogOut()
						: renderLogIn()}
				</ul>
			</div>
		</NavStyle>
	);
};

const NavStyle = styled.header`
	position: fixed;
	width: 100%;
	height: 70px;
	${'' /* padding: 0 60px; */}
	background-color: #fff;
	${'' /* display: flex; */}
	justify-content: space-between;
	align-items: center;
	border-bottom: 3px solid #00a3ff;
	z-index: 100;
	h1 {
		font-size: 4rem;
		color: #00a3ff;
	}
	.app-logo {
		width: 100px;
        position: relative;
    top: 19px;
    left: 15px;
	}
	#menuToggle {
    display: block;
    position: relative;
    top: -2rem;
    left: 100rem;
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
    input{
      display: none
    }
	}
 /* Adjust container size for (width > 600 and width < 768px) */
 @media screen and (min-width: 769px) and (max-width: 1024px){
  #menuToggle {
    display: block;
    position: relative;
    top: -2rem;
    left: 62rem; 
    }
	}
 }

  /* Adjust container size for (width > 600 and width < 768px) */
  @media screen and (min-width: 600px) and (max-width: 768px){
	#menuToggle {
    display: block;
    position: relative;
    top: -2rem;
    left: 37rem; 
    }
	}

  /* Adjust container size for (width < 600px) */
  @media  (max-width: 600px) {
    #menuToggle
 {
   display: block;
   position: relative;
   top: -18px;
   left: 34rem;
   
   z-index: 1;
   
   -webkit-user-select: none;
   user-select: none;
   .nav-item
 {
   text-decoration: none;
   color: #232323;
   
   transition: color 0.3s ease;
 }
 .nav-item:hover
 {
   color: tomato;
 }
 input
 {
   display: block;
   width: 40px;
   height: 32px;
   position: absolute;
   top: -7px;
   left: -5px;
   
   cursor: pointer;
   
   opacity: 0; /* hide this */
   z-index: 2; /* and place it over the hamburger */
   
   -webkit-touch-callout: none;
 }
 /*
  * Just a quick hamburger
  */
 span
 {
   display: block;
   width: 33px;
   height: 4px;
   margin-bottom: 5px;
   position: relative;
   
   background: #cdcdcd;
   border-radius: 3px;
   
   z-index: 1;
   
   transform-origin: 4px 0px;
   
   transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
               background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
               opacity 0.55s ease;
 }
 span:first-child
 {
   transform-origin: 0% 0%;
 }
 span:nth-last-child(2)
 {
   transform-origin: 0% 100%;
 }
  /* 
  * Transform all the slices of hamburger
  * into a crossmark.
  */
 input:checked ~ span
 {
   opacity: 1;
   transform: rotate(45deg) translate(-2px, -1px);
   background: #ff0000;
 }
  /*
  * But let's hide the middle one.
  */
 input:checked ~ span:nth-last-child(3)
 {
   opacity: 0;
   transform: rotate(0deg) scale(0.2, 0.2);
 }
  /*
  * Oh yeah and the last one should go the other direction
  */
 input:checked ~ span:nth-last-child(2)
 {
   transform: rotate(-45deg) translate(0, -1px);
 }
 .app-logo {
    position: relative;
    top: 10px;
    left: -24px;
  }
 }
 /* Adjust container size for (width > 300 and width < 420px) */
 @media screen and (min-width: 300px) and (max-width: 420px){
  #menuToggle
 {
   display: block;
   position: relative;
   top: -18px;
   left: 28.9rem;
   
   z-index: 1;
   
   -webkit-user-select: none;
   user-select: none;
 }
 }
 
 /*
  * Make this absolute positioned
  * at the top left of the screen
  */
 #menu
 {
   position: absolute;
   width: 300px;
   ${'' /* margin: -100px 0 0 -50px;
   padding: 50px;
   padding-top: 125px; */}
      margin: 0px 0px 0 -21.5rem;
    padding: 48px;
    padding-left: 6px;
    padding-top: 20px;
    padding-bottom: 22px;
   
   background: #ededed;
   list-style-type: none;
   -webkit-font-smoothing: antialiased;
   /* to stop flickering of text in safari */
   
   transform-origin: 0% 0%;
   transform: translate(100%, 0);
   
   transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
 }
 
 /*
  * And let's slide it in from the left
  */
 #menuToggle input:checked ~ ul
 {
   transform: none;
 }
 
`;

export default TopNav;
