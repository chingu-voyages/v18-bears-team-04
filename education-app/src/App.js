import React from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom"

import TopNav from "./components/TopNav"
import StudentSideNav from "./components/StudentSideNav"
import Homepage from "./pages/Homepage"
import SDashboard from "./pages/student/SDasboard"
import SAssignment from "./pages/student/SAssignmentList"

import ResetCSS from "./ResetCSS"
import SAssignmentList from './pages/student/SAssignmentList';

const App = () => {

   return (
      <>
         <Router>
            <ResetCSS/>
            <TopNav/>
            <StudentSideNav/>
            <Switch>
               <Route path="/" exact component={Homepage}/>
               <Route path="/studentdashboard" component={SDashboard} />
               <Route path="/assignmentlist" component={SAssignmentList} />
            </Switch>
         </Router>
      </>
   )
}

export default App;
