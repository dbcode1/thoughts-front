import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  underline: none;
  border-radius: 4px;
  padding: 4px;
  color: white;
  :hover {
    color: blue;
  }
`;

export const Nav = styled("div")`
display: flex;
justify-content: space-evenly;
width: 100%;
  position: fixed;
  z-index: 100;
  background-color: whitesmoke;
  bottom: 0;
  padding: 1em;
  overflow: hidden;
`;

export const Button = styled("button")`
  background: none;
  border-radius: 4px;
  border: 2px solid blue;
  transition-duration: 0.4s;
  font-family: var(--main-font-family);
  font-size: 16px;
  padding: 0.25em;
  background-color: blue;
  color: white;
  width: 100px;
  :hover {
    background-color: white;
    color: blue;
  }
`;


export const SpecialButton = styled(Button)`
  width: 100%;
  border: none;
  margin: 1em auto;
  :hover {
    color: red;
    background: none;
    
  }
`;

export const BasicLink = styled(Link)`
  text-decoration: none;
  margin: 0 auto;
  color: blue;
  :hover: {
    background-color: blue;
  }
`

export const Input = styled("input")`
  margin: 1em 0 0 0;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  border: 2px solid cyan;
  border-radius: 4px;
  ::placeholder {
    color: grey;
  }
`;

export const SearchInput = styled(Input)`
  text-align: center;
`;

export const Submit = styled(Input)`
  font-family: var(--main-font-family);
  background-color: white;
  border: 1px solid green;
  border-radius: 4px;
  margin-bottom: 1em;
  background-color: green;
  color: white;
  :hover {
    background-color: white;
    color: green;
  }
`;
