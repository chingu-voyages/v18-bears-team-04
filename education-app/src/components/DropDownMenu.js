import React from "react";

const DropDownMenu = (props) => {
	return (
		<option value={props.selection} onClick={(e) => props.handleClick(e)}>
			{props.selection}
		</option>
	);
};

export default DropDownMenu;
