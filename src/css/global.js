import styled from "styled-components";

export const AuthForm = styled("form")`
  box-shadow: 0px 5px 12px 10px rgba(205, 205, 205, 0.36);
  -webkit-box-shadow: 0px 5px 12px 10px rgba(205, 205, 205, 0.36);
  -moz-box-shadow: 0px 5px 12px 10px rgba(205, 205, 205, 0.36);
  display: grid;
  padding: 2em;
  justify-content: center;
  align-content: center;
`;

export const SearchForm = styled("form")`
  display: grid;
  width: 100%;
  justify-content: center;
  padding-bottom: 1em;
  margin: 1em auto;
`;

export const Wrapper = styled("div")`
  width: 100%;
  min-height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
`;
