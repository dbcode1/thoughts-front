import React, { useRef, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { Context } from "../Context";
import { ToastContainer, toast } from "react-toastify";
import { AuthForm } from "../css/global";
import { Nav, Input, Submit, BasicLink, Button } from "../css/buttons";
import { Wrapper } from "../css/global";
import { useGoogleLogin } from "@react-oauth/google";

const ForgotButton = styled("button")`
  display: block;
  border: none;
  bottom-border: 1px solid blue;
  margin: 0.25em auto 0 auto;
`;
const GoogleButton = styled(Button)`
  border: none;
  border-radius: 4px;
  margin: 0.5em auto 0 auto;
  padding: 0.5em;
  font-family: Verdana;
  width: 85%;
`;

function Login() {
  const ref = useRef();
  const { data, setData } = useContext(Context);
  const { email, password, isAuthenticated } = data;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function getEntries(id) {
    console.log("get entries token", token);
    await axios
      .post(`${process.env.REACT_APP_API}/user/entries/user`, { token })
      .then((res, req) => {
        console.log("entries", res.data);
        setData({ ...data, entries: res.data, thought: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function forgot() {
    navigate("/forgot", { replace: true });
  }

  async function handleSubmit(event) {
    console.log("LOGIN");

    await axios
      .post(`${process.env.REACT_APP_API}/user/login`, { email, password })
      .then((res) => {
        setData({ isAuthenticated: true });
        localStorage.setItem("token", res.data.token);
        ref.current.reset();
        console.log("LOGIN RESPONSE", res);
      })
      .catch((err, res) => {
        console.log("trigger alert", err);
        toast(err.response.data);
      });
  }

  const informParent = (response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setData({ isAuthenticated: true });
      getEntries(response.data.user._id);
    } else {
      console.log("No Authorization Token");
    }
  };

  const googleLogin = useGoogleLogin({
    // get ID tokens from access-tokens
    onSuccess: async (tokenResponse) => {
      const tokens = await axios.post(
        `${process.env.REACT_APP_API}/user/google-token`,
        { tokenResponse }
      );
      login(tokens.data.id_token);
    },
    flow: "auth-code",
  });

  const login = (id_token) => {
    const data = { idToken: id_token };
    localStorage.setItem("token", id_token);
    // const data = { idToken: response.credential };
    //localStorage.setItem("token", response.credential);

    axios
      .post(`${process.env.REACT_APP_API}/user/google`, data)
      .then((response) => {
        console.log("GOOGLE SIGNIN SUCCESS", response);
        // inform parent component
        informParent(response);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error);
      });
  };

  if (isAuthenticated) {
    return <Navigate to="/userApp" />;
  }

  return (
    <>
      {" "}
      <ToastContainer
        progressClassName="toastProgress"
        // bodyClassName="toastBody"
      ></ToastContainer>
      <Wrapper>
        <AuthForm
          ref={ref}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <Input
            type="email"
            className="email"
            placeholder="Email"
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          ></Input>
          <Input
            type="password"
            placeholder="Password"
            minlength="10"
            onChange={(event) =>
              setData({ ...data, password: event.target.value })
            }
          ></Input>
          <Submit type="submit" value="Submit"></Submit>
          <ForgotButton onClick={forgot}>Forgot Password</ForgotButton>
          <GoogleButton onClick={() => googleLogin()}>Google</GoogleButton>

          {/* <Google>
            LOGIN WITH GOOGLE
            <GoogleLogin
              size="medium"
              type="icon"
              logo_alignment="center"
              shape="square"
              onSuccess={login}
              redirect_uri="https://thoughtpad.netlify.app"
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Google> */}
        </AuthForm>
      </Wrapper>
      <Nav>
        <BasicLink to="/register">Register</BasicLink>{" "}
      </Nav>
    </>
  );
}

export default Login;
