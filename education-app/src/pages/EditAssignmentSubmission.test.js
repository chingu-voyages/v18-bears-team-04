import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import EditAssignmentSubmission from "./EditAssignmentSubmission";

describe("<EditClass />", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<EditAssignmentSubmission />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("renders as expected", () => {
		const tree = renderer
			.create(
				<BrowserRouter>
					<EditAssignmentSubmission />
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
