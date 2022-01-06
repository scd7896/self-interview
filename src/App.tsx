import React from "react";
import { css } from "@emotion/react";
import "./App.css";
import Routers from "./Routers";
import { Header, Body } from "./design/Layout";

function App() {
  return (
    <>
      <Header>eee</Header>
      <Body>
        <Routers />
      </Body>
    </>
  );
}

export default App;

const test = css`
  color: red;
`;
