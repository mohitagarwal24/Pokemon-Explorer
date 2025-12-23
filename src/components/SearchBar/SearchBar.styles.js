import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 280px;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #74c0fc;
  }
`;