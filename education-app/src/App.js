import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import TopNav from "./components/TopNav";
import Homepage from "./pages/Homepage";
import SideNav from "./components/SideNav";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AssignmentView from "./pages/teacher/AssignmentView";
import Grades from "./pages/teacher/Grades";
import AssignmentSubmission from "./pages/student/AssignmentSubmission";
import AssignmentList from "./components/AssignmentList";

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
					{/* {TokenService.hasAuthToken() && <SideNav />} */}

					<Switch>
						<Route
							exact
							path='/:userName/:userType/dashboard'
							render={(routeProps) => <TeacherDashboard {...routeProps} />}
						/>

						<Route
							exact
							path='/:userName/:userType/dashboard'
							render={(routeProps) => <StudentDashboard {...routeProps} />}
						/>
						<Route
							exact
							path='/:userName/assignments'
							render={(routeProps) => <AssignmentList {...routeProps} />}
						/>
						<Route
							exact
							path='/:assignmentName/submission'
							render={(routeProps) => <AssignmentSubmission {...routeProps} />}
						/>

						<Route
							exact
							path='/:studentUsername/assignment-view'
							component={AssignmentView}
						/>

						<Route
							exact
							path='/:userName/grades'
							render={(routeProps) => <Grades {...routeProps} />}
						/>
					</Switch>
				</Router>
			</>
		</ScholarContext.Provider>
	);
};

export default App;
