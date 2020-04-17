import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Homepage from "./pages/Homepage";
import SideNav from "./components/SideNav";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AssignmentView from "./pages/teacher/AssignmentView";
import Grades from "./pages/teacher/Grades";

import ResetCSS from "./ResetCSS";
import TokenService from "./services/token-service";

const App = () => {
	return (
		<>
			<Router>
				<ResetCSS />
				<TopNav />
				{TokenService.hasAuthToken() && <SideNav />}
				{/* Add conditional to render omnipresent side nav when user is login */}
				{/* {TokenService.hasAuthToken ? <SideNav /> : null} */}
				<Switch>
					<Route path='/' exact component={Homepage} />
					{/* <Route path='/studentdashboard' component={StudentDashboard} /> */}
					{/* <Route path='/teacherdashboard' component={TeacherDashboard} /> */}
					<Route
						exact
						path='/:userName/studentdashboard'
						render={(routeProps) => <StudentDashboard {...routeProps} />}
					/>
					<Route
						exact
						path='/:userName/dashboard'
						render={(routeProps) => <TeacherDashboard {...routeProps} />}
					/>

					<Route exact path='/assignment-view' component={AssignmentView} />

					<Route
						exact
						path='/:userName/grades'
						render={(routeProps) => <Grades {...routeProps} />}
					/>
				</Switch>
			</Router>
		</>
	);
};

export default App;
