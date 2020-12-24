import React from "react";
import styled from "styled-components";

import poroading from "../img/poroading.png";

const PoroadingStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  margin : 30px;
  img {
    width: 100px;
  }
`;

export default function Poroading() {
  return (
    <PoroadingStyle>
      <img src={poroading}></img>
      <strong>POROADING...</strong>
    </PoroadingStyle>
  );
}