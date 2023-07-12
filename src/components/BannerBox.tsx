import React from "react";
import styled from "styled-components";
import { useFetchLetters } from "../hooks/useFetchLetters";

const Wrapper = styled.div`
  width: 240px;
  height: 240px;
  padding: 20px;
  margin: 20px;
  border-radius: 4px;
  background: white;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

const Title = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 500;
`;

const Letters = styled.p`
  font-size: 1.15rem;
  text-align: center;
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  padding: 10px 0;
  min-height: 23.5px;
  overflow: hidden;
  white-space: nowrap;
`;

interface BannerBoxProps {
  id: number;
  intervalMs?: number;
}

export const BannerBox: React.FC<BannerBoxProps> = ({
  id,
  intervalMs = 2000,
}) => {
  const { letters } = useFetchLetters({ id, intervalMs });

  return (
    <Wrapper>
      <Title>Banner {id}</Title>
      <Letters>{letters}</Letters>
    </Wrapper>
  );
};
