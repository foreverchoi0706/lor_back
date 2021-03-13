import React, { memo, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { matchList } from "../../util/reducers/searchReducer";

import Loading from "../Loading";
import Match from "./Match";

const MatchListStyle = styled.section`
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 600px) {
    width: 100vw;
  }
  @media (max-width: 340px) {
  }
`;

function MatchList({ accountId }) {
  const { isLoaded, data } = useSelector(
    (rootReducer) => rootReducer.searchReducer.matchList,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(matchList(accountId));
    window.addEventListener("scroll", () => {
      const nowPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const DocHeigth = document.body.scrollHeight;
      if (nowPosition + windowHeight === DocHeigth) {
        // dispatch(matchList(accountId));
      }
    });
  }, [dispatch, accountId]);

  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <MatchListStyle>
      {data.map((match) => (
        <Match key={match.gameId} {...match} />
      ))}
    </MatchListStyle>
  );
}

export default memo(MatchList);
