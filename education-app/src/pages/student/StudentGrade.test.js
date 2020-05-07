import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import StudentGrade from "./StudentGrade";

describe("<StudentGrade />", () => {
	it("renders without crashing", () => {
		const match = { params: { assignmentId: "5ead25df8c4f4d0991cc0f43" } };
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<StudentGrade match={match} />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("renders as expected", () => {
		const match = { params: { assignmentId: "5ead25df8c4f4d0991cc0f43" } };
		const tree = renderer
			.create(
				<BrowserRouter>
					<StudentGrade match={match} />
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
