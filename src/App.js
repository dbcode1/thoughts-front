import React from "react";
import { Outlet } from "react-router-dom";
import "./css/app.css";
import "react-toastify/dist/ReactToastify.css";

// import Nav from './components/Nav'

// if (typeof window !== "undefined") {
//   injectStyle();
// }

function App() {
  return (
    <div>
      {/* <Nav /> */}
      <Outlet />
    </div>
  );
}

export default App;
