import React from "react";
import styled from "styled-components";

const ValidationError = (props) => {
	return (
		<ValidationErrorStyle>
			<div className='error-message'>{props.message}</div>
		</ValidationErrorStyle>
	);
};

const ValidationErrorStyle = styled.div`
	text-align: center;
	color: red;
	font-size: 20px;
	font-style: italic;
`;

export default ValidationError;
