import React from 'react'
import styled from "styled-components"

const TopNav = () => {

   //temporary
   let loggedIn = false


   return (
      <NavStyle>
         <h1>iScholars</h1>
         <nav className="top-nav-menu">
            <ul>
               {
                  loggedIn ? 
                     <>
                        <li>My Page</li>
                        <li>My Profile</li>
                        <li>Log Out</li>
                     </>
                     :
                     <>
                        <li>Sign Up</li>
                        <li>Log In</li>
                     </>
               }
            </ul>
         </nav>
      </NavStyle>
   )
}

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
         li {
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
`

export default TopNav