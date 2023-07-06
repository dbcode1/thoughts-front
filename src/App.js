import React from "react";
import { Outlet } from "react-router-dom";
import "./css/app.css";
import { injectStyle } from "react-toastify/dist/inject-style";
// import Nav from './components/Nav'
import { GoogleLogin } from "@react-oauth/google";

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div>
      {/* <Nav /> */}
      <Outlet />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}

export default App;
