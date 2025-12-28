import styled from "styled-components";

export const CardContainer = styled.div`
  width: 180px;
  height: 260px;
  perspective: 1000px;
`;

export const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  backface-visibility: hidden;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;