import { React, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Context } from "../Context";
import { SearchForm } from "../css/global";
import { ToastContainer, toast } from "react-toastify";
import "../css/app.css";
import styled from "styled-components";
import { Nav, Button, SearchInput, Submit } from "../css/buttons";
import { List } from "./List";

const AppWrapper = styled("div")`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  padding: 0;
  font-family: var(--main-font-family);
`;

const EntriesWrapper = styled("div")`
  margin: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-conent: center;
  // align-items: center;
`;

const DeleteMessage = styled("p")`
  font-size: 13px;
  margin: 0 auto 0.25em;
`;

const Header = styled("h1")`
  text-align: center;
  font-family: "Momo Signature", cursive;
  margin: 0.5em 0 0 0;
`;

function UserApp() {
  const { data, setData } = useContext(Context);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const { thought, entries } = data;
  const { entries } = data;
  const [thought, setThought] = useState("");
  const [thoughts, setThoughts] = useState([]);

  // get entries
  async function getEntries() {
    console.log("get entries");
    await axios
      .post(`${process.env.REACT_APP_API}/user/entries/user`, { token })
      .then((res, req) => {
        setData({ ...data, entries: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getEntries();
  }, []);

  const onChange = (event) => {
    setThought(event.target.value);
  };

  // add an entry
  async function handleSubmit(event) {
    event.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API}/user/entries`, { thought, token })
      .then((res) => {
        setData({ ...data, entries: res.data });
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data);
      });
    setThought("");
  }

  // logout
  const handleLogout = () => {
    setData({ isAuthenticated: false });
    localStorage.clear();
    navigate("/", { replace: true });
  };

  async function deleteAccount(data, setData) {
    console.log("DELETE ACCOUNT");
    if (
      window.confirm("Are you sure you want to permanently erase your account?")
    ) {
      try {
        const removeUser = await axios.post(
          `${process.env.REACT_APP_API}/user/remove`,
          { token }
        );
        console.log("DELETE ACCOUNT SUCCESS", removeUser.data);
        toast(removeUser.data);
        handleLogout();
      } catch (error) {
        console.log("DELETE ACCOUNT ERROR", error);
        toast("Account not Deleted");
      }
    } else {
      navigate("/UserApp", { replace: true });
    }
  }

  return (
    <AppWrapper>
      <ToastContainer
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      ></ToastContainer>
      <SearchForm
        onSubmit={(event) => {
          handleSubmit(event);
          event.preventDefault();
        }}
      >
        <Header>Thought Pad</Header>
        <SearchInput
          type="text"
          placeholder="Your Thought"
          onChange={onChange}
          required
          value={thought}
        />
        <Submit className="go" type="submit"></Submit>
        <DeleteMessage>Click thought to delete</DeleteMessage>
      </SearchForm>
      <EntriesWrapper>{entries && <List thoughts={thoughts} />}</EntriesWrapper>
      <Nav>
        <Button onClick={handleLogout}>Logout</Button>
        <Button to="/" onClick={deleteAccount}>
          Delete Account
        </Button>
      </Nav>
    </AppWrapper>
  );
}

export default UserApp;
