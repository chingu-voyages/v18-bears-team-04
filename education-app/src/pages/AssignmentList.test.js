import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import AssignmentList from "./AssignmentList";

describe("<AssignmentList />", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		const match = { params: { userName: "joteacher" } };
		ReactDOM.render(
			<BrowserRouter>
				<AssignmentList match={match} />
			</BrowserRouter>,
			div
		);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("renders as expected", () => {
		const match = { params: { userName: "joteacher" } };
		const tree = renderer
			.create(
				<BrowserRouter>
					<AssignmentList match={match} />
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
