import React from 'react'
import styled from "styled-components"

const SAssignmentList = () => {

   const examples = [
      {
         name: "Assignment-A"
      },
      {
         name: "Assignment-B"
      },
      {
         name: "Assignment-C"
      },
      {
         name: "Assignment-D"
      },
   ]

   const assignments = examples.map(assign => {

      return (
         <>
            <div className="assignment">
               <h4 className="assignment-title">{assign.name}</h4>
            </div>
         </>
      )
   })

   return (
      <SAssignmentListStyle>
         <div className="wrap">
            <h2 className="page-title" >Assignments List</h2>
            <h3>Your Assignments</h3>
            <div className="assignment-table">
               {assignments}
            </div>
         </div>
      </SAssignmentListStyle>
   )
}

const SAssignmentListStyle = styled.main`
   width: 78%;
   height: 100v;
   padding-top: 60px;
   margin-left: auto;
   .wrap {
      width: 90%;
      margin: 0 auto;
   }
   .page-title {
      font-size: 3.8rem;
      margin-top: 30px;
      color: #00A3FF;
   }
   h3 {
      font-size: 3rem;
      margin-top: 10px;
      color: #5E5E5E;
   }
   .assignment-table {
      width: 100%;
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .assignment {
         width: 45%;
         background-color: #fff;
         margin-bottom: 20px;
         border-radius: 10px;
         position: relative;
         box-shadow: 0 5px 20px #0000001f;

         &:before {
            content: "";
            display: block;
            margin-top: 30%;
         }
         .assignment-title {
            position: absolute;
            color: #5E5E5E;
            top: 10%;
            left: 5%;
            font-size: 2rem;
         }
      }
   }
`

export default SAssignmentList