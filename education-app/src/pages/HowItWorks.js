import React from "react";
import styled from "styled-components";

const HowItWorks = () => {
  return (
    <HowItWorksStyle>
      <section className="how-to">
        <h1 className="section-title">How it works</h1>
        <p className="section-text">Are you a Teacher or a Student?</p>
        <div className="steps">
          <div className="column step">
            <i className="fas fa-4x fa-user-circle" />
            <p className="section-text1">
              Create an account and login as a Teacher or a Student. You can
              decide to update your profile for better view on the platform
            </p>
          </div>
          <div className="column step">
            <i className="fas fa-users" />
            <p className="section-text1">
              As a teacher, you have an access to talk to your students, Manager
              your classes, Create assignments, Grade your students, and evaluate
              perfomance.
            </p>
          </div>
          <div className="column step">
            <i className="fas fa-chalkboard-teacher" />
            <p className="section-text1">
              As a student, you can talk to your teacher, Work on your
              assignment, Get your grades, Give a feedback, and also recieve a
              real time feedback.
            </p>
          </div>
        </div>
      </section>
    </HowItWorksStyle>
  );
};

const HowItWorksStyle = styled.div`
  section {
    padding: 40px;
    display: flex;
    flex-direction: column;
    background: #f5f5f0;
    .section-title {
      position: relative;
      margin-bottom: 15px;
      font-size: 23px;
      &::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 60px;
        border: 1.5px solid #0facf3;
      }
    }
    .section-text {
      font-size: 15px;
    }
    .steps {
      display: flex;
      justify-content: space-between;
      flex: column;
      .column.step {
        flex-basis: 50%;
        flex-direction: column;
        padding: 20px 50px;
        .fas {
          width: 65px;
          height: 67px;
          border-radius: 5px;
          /* background: #0facf3; */
          color: #0facf3;
          display: block;
          line-height: 60px;
          text-align: center;
          font-size: 162.5em;
          font-weight: 600;
          margin-left: 120px;
        }
        .section-text1 {
          position: relative;
          margin-bottom: 15px;
          text-align: center;
          font-size: 15px;
          line-height: 19px;
          word-spacing: 3px;
        }
      }
    }
  }
`;

export default HowItWorks;
