import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./index.css";
import App from "./App";
import { ContextProvider } from "./Context";
import Register from "./components/Register";
import Login from "./components/Login";
import UserApp from "./components/UserApp";
import Landing from "./components/Landing";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <ContextProvider>
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Landing />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userApp" element={<UserApp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset/:token" element={<Reset />} />
            {/* PRIVATE ROUTE */}
          </Route>
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </ContextProvider>
  ,

  rootElement
);

