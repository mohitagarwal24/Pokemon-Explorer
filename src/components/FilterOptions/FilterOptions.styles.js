import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

export const TypeButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  background-color: ${({ active, color }) =>
    active ? color : "rgba(0,0,0,0.08)"};
  color: ${({ active }) => (active ? "#fff" : "#333")};

  &:hover {
    opacity: 0.85;
  }
`;