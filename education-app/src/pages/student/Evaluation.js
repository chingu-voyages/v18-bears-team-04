import React from 'react'

import styled from "styled-components"

const Evaluation = () => {

   //temporary
   let exampleEval = [
      {
         subj: "English",
         score: 93
      },
      {
         subj: "Japanese",
         score: 77
      },
      {
         subj: "Spanish",
         score: 52
      },
   ]

   const displayedEvaluation = exampleEval.map((evl, i) => {

      let scoreColor
      if (evl.score >= 90) {
         scoreColor = "#FF0000"
      } else if (evl.score >= 80) {
         scoreColor = "#FF5C00"
      } else if (evl.score >= 70) {
         scoreColor = "#FFD600"
      } else if (evl.score >= 60) {
         scoreColor = "#17A300"
      } else {
         scoreColor = "#0057FF"
      }

      return (
         <div className="evaluation" key={i} >
            <p className="class">{evl.subj}</p>
            <div 
               className="score"
               style={{backgroundColor: scoreColor}}
            >
               <p>{evl.score}</p>
            </div>
         </div>
      )
   })

   return (
      <EvaluationStyle>
         <div className="wrap">
				<h2 className='page-title'>Assignment Grade</h2>
            <h3>Your average grade per class</h3>
            <div className="eval-table">
               {displayedEvaluation}
            </div>
         </div>
      </EvaluationStyle>
   )
}

const EvaluationStyle = styled.div`
   padding: 60px 0;
	padding-left: 250px;
	width: 100vw - 250px;
	height: 100%;
	margin-left: auto;
	.wrap {
		width: 90%;
		margin: 0 auto;
      color: #5f5f5f;
	}
	.page-title {
		font-size: 3.8rem;
		margin-top: 30px;
		color: #00a3ff;
	}
   h3 {
		font-size: 3rem;
		margin-top: 10px;
		color: #5e5e5e;
   }
   .eval-table {
		width: 100%;
		margin-top: 40px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
      .evaluation {
			width: 45%;
			margin-bottom: 20px;
			border-radius: 10px;
			position: relative;
			box-shadow: 0 5px 20px #0000001f;
         &:before {
            content: "";
            display: block;
            margin-top: 150px;
         }
         .class, .score {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
         }
         .class {
            font-size: 2.4rem;
            left: 10%;
         }
         .score {
            right: 10%;
            font-size: 3.4rem;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            line-height: 100px;
            color: #fff;
         }
      }
   }
`

export default Evaluation