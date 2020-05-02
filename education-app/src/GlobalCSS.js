import { createGlobalStyle } from "styled-components";

const GlobalCSS = createGlobalStyle`
   section {
      padding-left: 250px;
      padding-top: 60px;
      width: 100%;
      .wrapper {
         width: 95%;
         height: 100%;
         margin: 0 auto;
         padding: 20px 0;
         .page-title {
            font-size: 3.8rem;
            color: #00a3ff;
         }
      }
   }
`

export default GlobalCSS