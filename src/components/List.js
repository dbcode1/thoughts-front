import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import getEntries from "./UserApp";
import styled from "styled-components";
import uniqid from "uniqid";

const token = localStorage.getItem("token");

const Card = styled("li")`
  list-style: none;
  margin: 8px 0;
  width: 100%;
  overflow-wrap: break-word;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 4px;
  
`;

const CardContainer = styled("ul")`
  text-align: center;
  padding: 0;
  margin: 0 25%;
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
