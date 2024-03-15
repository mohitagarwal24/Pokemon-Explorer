import { Paper, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  background-color: lightcyan;
  border-radius: 50%;
`;

const StyledPokemonCard = styled(Paper)`
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PokemonCard = ({pokemon}) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <StyledPokemonCard>
      <PokemonImage
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.url.split("/")[6]
        }.png`}
        alt={pokemon.name}
      />
      <Typography variant="body1">
        {capitalizeFirstLetter(pokemon.name)}
      </Typography>
    </StyledPokemonCard>
  );
};

export default PokemonCard;
