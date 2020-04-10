import React from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom"

import TopNav from "./components/TopNav"
import Homepage from "./pages/Homepage"
import StudentDashBoard from "./pages/StudentDasboard"

import ResetCSS from "./ResetCSS"

const App = () => {

   return (
      <>
         <Router>
            <ResetCSS/>
            <TopNav/>
            <Switch>
               <Route>
                  <Homepage path="/" />
               </Route>
               <Route>
                  <StudentDashBoard path="/test" />
               </Route>
            </Switch>
         </Router>
      </>
   )
}

export default App;
