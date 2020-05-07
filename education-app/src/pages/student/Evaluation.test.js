import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Evaluation from "./Evaluation";

describe("<Evaluation />", () => {
	it("renders without crashing", () => {
		const match = { params: { userName: "joteacher" } };
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<Evaluation match={match} />
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
					<Evaluation match={match} />
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
