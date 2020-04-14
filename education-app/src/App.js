import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Homepage from "./pages/Homepage";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import ResetCSS from "./ResetCSS";

const App = () => {
	return (
		<>
			<Router>
				<ResetCSS />
				<TopNav />
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
				</Switch>
			</Router>
		</>
	);
};

export default App;
