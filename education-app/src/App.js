import React from 'react';

import Homepage from "./pages/Homepage"
import TopNav from "./components/TopNav"

import ResetCSS from "./ResetCSS"

const App = () => {

   return (
      <>
         <ResetCSS/>
         <TopNav/>
         <Homepage/>
      </>
   )
}

export default App;
