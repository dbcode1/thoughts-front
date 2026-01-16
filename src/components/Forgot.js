import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button, Input } from "../css/buttons";
import {AuthForm, Wrapper} from '../css/global'
import { ToastContainer, toast } from "react-toastify";
import { Resend } from 'resend'
import "react-toastify/dist/ReactToastify.min.css";
//const token = JSON.parse(localStorage.getItem("token"));
let token = ''

const resend = new Resend("re_dChRYTuZ_9n2kfrsMs2XPau8Kni1myNb1");


const Reset = styled(Button)`
    padding: 10px;
    margin: 1em auto;
   
 
`
const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Reset",
  });

  const { email, buttonText } = values;
 
  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
   
  try {
    const response = await fetch("/.netlify/functions/reset.mjs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        "email": email
      },
    });

    const result = await response.text();
    if (response.ok) {
      alert("Message sent successfully!");
    } else {
      alert(`Error: ${result}`);
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred while sending the message.");
  }
  };

  const passwordForgotForm = () => (
    <form>
      <Wrapper>
        <h1 style={{"margin-top": "-2em" }}>
          Forgot Password
        </h1>
      <AuthForm>
        <Input
          type="text"
          value={email}
          placeholder="email"
          onChange={handleChange("email")}
        ></Input>

        <Reset className=" btn btn-primary" onClick={handleSubmit}>
          {buttonText}
        </Reset>
        </AuthForm>
      </Wrapper>
    </form>
  );

  return (
    <div>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />

        {passwordForgotForm()}
      </div>
    </div>
  );
};

export default Forgot;
