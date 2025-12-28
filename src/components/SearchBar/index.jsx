import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 25px;
  padding: 6px 12px;
  width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:focus-within {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 8px 10px;
  font-size: 0.95rem;
  border-radius: 25px;
  background: transparent;
`;

const Icon = styled(FiSearch)`
  font-size: 1.2rem;
  color: #888;
  margin-right: 6px;
`;

const SearchBar = ({ onSearch = () => {}, onChange, onKeyPress }) => {
  // على الأقل onSearch موجود دائماً لتجنب مشاكل الاختبارات
  const handleChange = (e) => {
    const value = e.target.value;
    onChange && onChange(value);
    onSearch(value);
  };

  return (
    <SearchContainer>
      <Icon />
      <Input
        type="text"
        placeholder="Search Pokémon..."
        aria-label="Search Pokémon"
        onChange={handleChange}
        onKeyPress={onKeyPress}
      />
    </SearchContainer>
  );
};

export default SearchBar;
