import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TopNav from "./components/TopNav";
import Homepage from "./pages/Homepage";
import StudentDashboard from "./pages/StudentDasboard";
import TeacherDashboard from "./pages/TeacherDashboard";

import ResetCSS from "./ResetCSS";

const App = () => {
	return (
		<>
			<Router>
				<ResetCSS />
				<TopNav />
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/studentdashboard' component={StudentDashboard} />
					<Route path='/teacherdashboard' component={TeacherDashboard} />
				</Switch>
				{/* <StudentDashboard/> */}
			</Router>
		</>
	);
};

export default App;
