import React, { useState } from "react";

import ValidationError from "./ValidationError";
import ApiService from "../services/api-services";
import TokenService from "../services/token-service";
import styled from "styled-components";

const LogInForm = (props) => {
  const [{ username }, setInput] = useState({ username: "" });
  const [{ error }, setError] = useState({ error: null });

  const handleChange = (e) => {
    setError({ error: null });
    const { value } = e.target;
    setInput({ username: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiService.getUserName(username)
      .then((res) => {
        TokenService.saveAuthToken(res._id);
        props.handleLogIn(res);
        if (res.classIds.length === 1) {
          TokenService.saveClassToken(res.classIds);
        }
      })
      .catch((err) => setError({ error: err }));
  };

  const errorMessage = () => {
    if (error != null) {
      return `User name is not found.`;
    }
  };

  return (
    <LogInFormStyle>
      <div className="modal-box">
        <h1 className="modal-title">{props.formType}</h1>
        <div className="demo-info">
          <h2>Demo Accounts</h2>
          <h2 clasname="demo-names">demoteacher | demostudent</h2>
        </div>
        <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="username-input"
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => handleChange(e)}
            required
          />
          <ValidationError message={errorMessage()} />
          <button className="modal-btn" value={props.formType}>
            {props.formType}
          </button>
        </form>
      </div>
    </LogInFormStyle>
  );
};

const LogInFormStyle = styled.div`
  .modal-box {
    width: 500px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .modal-title {
    font-size: 4rem;
    padding: 30px;
    text-align: center;
    color: #00a3ff;
  }
  .demo-info {
    color: #888888;
    margin: 5px auto;
    text-align: center;
    font-style: italic;
    h2 {
      font-size: 1.5rem;
    }
    .demo-names {
      font-size: 1.25rem;
    }
  }

  .username-input {
    display: block;
    width: 80%;
    margin: 10px auto;
    padding-left: 10px;
    height: 60px;
    font-size: 2rem;
    border-radius: 10px;
    border: 1px solid #00a3ff;
    outline: 0;
  }
  .modal-btn {
    display: block;
    height: 50px;
    width: 200px;
    padding: 10px;
    margin: 20px auto;
    font-size: 2rem;
    background-color: #00a3ff;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
  }
  /**
	Screen size for login form */
  @media (max-width: 600px) {
    /**
 Modal form */
    .modal-box {
      width: 378px;
    }
  }
  @media screen and (min-width: 300px) and (max-width: 420px){
	    /**
 Modal form */
 .modal-box {
      width: 260px;
    
  }
`;

export default LogInForm;
