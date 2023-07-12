import React, { useState } from "react";
import styled from "styled-components";
import { BannerBox } from "./components/BannerBox";
import { Checkbox } from "./components/Checkbox";

const ControlsList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 20px;
`;

const Wrapper = styled.div`
  min-width: 800px;
  width: 100%;
`;

const BannersWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const App: React.FC = () => {
  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));

  const toggle = (id: number) => {
    setCheckedState(
      checkedState.map((item, index) => (index === id ? !item : item))
    );
  };

  return (
    <Wrapper>
      <ControlsList>
        {checkedState.map((checked, i) => (
          <Checkbox key={i} id={i} checked={checked} onToggle={toggle} />
        ))}
      </ControlsList>
      <BannersWrapper>
        {checkedState.map(
          (checked, i) => checked && <BannerBox key={i} id={i} />
        )}
      </BannersWrapper>
    </Wrapper>
  );
};

export default App;
