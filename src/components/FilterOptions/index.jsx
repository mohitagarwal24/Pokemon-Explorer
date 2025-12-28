import React from "react";
import styled from "styled-components";

const typeColors = {
  fire: "#ff6b6b",
  water: "#4dabf7",
  grass: "#51cf66",
  electric: "#ffd43b",
  bug: "#94d82d",
  poison: "#b197fc",
  flying: "#74c0fc",
  normal: "#ced4da",
  ground: "#e0c068",
  fairy: "#f783ac",
  fighting: "#d9480f",
  psychic: "#f06595",
  rock: "#c0a080",
  ghost: "#845ef7",
  ice: "#66d9e8",
  dragon: "#5f3dc4",
  dark: "#495057",
  steel: "#adb5bd",
};

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TypeButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
  transition: all 0.2s;
  background-color: ${({ active, color }) => (active ? color : "rgba(0,0,0,0.05)")};
  color: ${({ active }) => (active ? "#fff" : "#333")};

  &:hover {
    opacity: 0.8;
  }
`;

const FilterOptions = ({ types = [], selectedType = "", onSelectType = () => {} }) => {
  return (
    <FilterContainer>
      <TypeButton
        active={selectedType === ""}
        color="#888"
        onClick={() => onSelectType("")}
      >
        All
      </TypeButton>
      {types.map((type) => (
        <TypeButton
          key={type}
          active={selectedType === type}
          color={typeColors[type] || "#ccc"}
          onClick={() => onSelectType(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </TypeButton>
      ))}
    </FilterContainer>
  );
};

export default FilterOptions;
