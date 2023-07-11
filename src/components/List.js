import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import { getEntries } from "./UserApp";
import styled from "styled-components";
import uniqid from "uniqid";

const token = localStorage.getItem("token");

const Card = styled("li")`
  list-style: none;
  margin: 8px auto;
  width: 300px;
  overflow-wrap: break-word;
`;

const CardContainer = styled("ul")`
  text-align: center;
  padding: 0;
  margin: 0;
`;

export function List(props) {
  const { data, setData } = useContext(Context);
  let entries = data.entries;

  useEffect(() => {}, [entries]);

  async function getEntries() {
    await axios
      .post(`${process.env.REACT_APP_API}/user/entries/user`, { token })
      .then((res, req) => {
        setData({ entries: res.data, thought: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // delete entry
  async function handleDelete(e) {
    const title = e.target.parentNode.childNodes[0].innerHTML;
    setData({
      ...data,
      entry: "",
      entries: entries.filter((entry) => entry.text !== title),
    });
    const response = await axios.post(
      `${process.env.REACT_APP_API}/user/delete`,
      { title, token }
    );
    if (response.status === 200) {
      getEntries();
    } else {
      console.log("delete error");
    }
  }

  return (
    <>
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <CardContainer>
              <Card id={uniqid()} onClick={(e) => handleDelete(e)}>
                {entry.text}
              </Card>
            </CardContainer>
          );
        })}
    </>
  );
}
