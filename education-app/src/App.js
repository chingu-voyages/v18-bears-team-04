import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import TopNav from "./components/TopNav";
import Homepage from "./pages/Homepage";
// import StudentDashboard from "./pages/student/StudentDashboard";
import Dashboard from "./pages/Dashboard";
import AssignmentView from "./pages/teacher/AssignmentView";
import EditClass from "./pages/EditClass";
import Grades from "./pages/teacher/Grades";
import AssignmentSubmission from "./pages/student/AssignmentSubmission";
import AssignmentList from "./pages/AssignmentList";

import ScholarContext from "../src/ScholarContext";

import ResetCSS from "./ResetCSS";
import TokenService from "./services/token-service";

const App = () => {
	/*Context Things */

	const [user, setUser] = useState(null);

	const saveUser = (info) => {
		setUser({
			user: info,
		});
	};
	const contextValue = {
		user: user,
		saveUser: (info) => saveUser(info),
	};

	return (
		<ScholarContext.Provider value={contextValue}>
			<>
				<Router>
					<ResetCSS />

					<TopNav />

					{/* Order matters! */}

					<Route exact path='/' component={Homepage} />

					<Switch>
						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:userName/:role/dashboard'
								render={(routeProps) => <Dashboard {...routeProps} />}
							/>
						) : (
							<Redirect to='/' />
						)}

						{/* {TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:userName/student/dashboard'
								render={(routeProps) => <StudentDashboard {...routeProps} />}
							/>
						) : (
							<Redirect to='/' />
						)} */}
					</Switch>

					<Switch>
						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:userName/assignments'
								render={(routeProps) => <AssignmentList {...routeProps} />}
							/>
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:userName/edit-class'
								render={(routeProps) => <EditClass {...routeProps} />}
							/>
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:title/:id/:role/submission'
								render={(routeProps) => (
									<AssignmentSubmission {...routeProps} />
								)}
							/>
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:title/:id/:role/assignment'
								render={(routeProps) => (
									<AssignmentSubmission {...routeProps} />
								)}
							/>
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:studentUsername/assignment-view'
								component={AssignmentView}
							/>
						) : (
							<Redirect to='/' />
						)}

						{TokenService.hasAuthToken() ? (
							<Route
								exact
								path='/:userName/grades'
								render={(routeProps) => <Grades {...routeProps} />}
							/>
						) : (
							<Redirect to='/' />
						)}
					</Switch>
				</Router>
			</>
		</ScholarContext.Provider>
	);
};

export default App;
