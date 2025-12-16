import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import getEntries from "./UserApp";
import styled from "styled-components";
import uniqid from "uniqid";

const token = localStorage.getItem("token");

const Card = styled("li")`
  list-style: none;
  margin: 8px;
  width: 10rem;
  height: 6rem;
  max-width: 6rem;
  background-color: yellow;
  overflow-wrap: break-word;
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  font-family: "Momo Signature", cursive;
  cursor: pointer;
`;

const CardContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 auto;
`;

export function List(props) {
  const { data, setData } = useContext(Context);
  let entries = data.entries;

  useEffect(() => {}, [entries]);

  // delete entry
  async function handleDelete(e, id) {
    //entries.forEach((entry) => console.log(entry._id));

    //get text of clicked
    console.log(id);

    const response = await axios.post(
      `${process.env.REACT_APP_API}/user/delete`,
      {
        id,
        token,
      }
    );
    console.log(response);
    setData({
      ...data,
      entry: "",
      entries: entries.filter((entry) => entry._id !== id),
    });
  }

  return (
    <>
      {entries.length > 0 &&
        entries.map((entry) => {
          return (
            <CardContainer>
              <Card onClick={(e) => handleDelete(e, entry._id)}>
                {entry.text}
              </Card>
            </CardContainer>
          );
        })}
    </>
  );
}
