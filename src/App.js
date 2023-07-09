import React from "react";
import { Outlet } from "react-router-dom";
import "./css/app.css";
import { injectStyle } from "react-toastify/dist/inject-style";
// import Nav from './components/Nav'

import { GoogleOAuthProvider } from '@react-oauth/google';

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  return (
    <GoogleOAuthProvider clientId="130497617650-77cf2o6fkhpsln2826959fg9p00qog58.apps.googleusercontent.com">

    <div>
      {/* <Nav /> */}
      <Outlet />
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
