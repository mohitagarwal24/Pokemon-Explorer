import React from "react";
import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

// Styled components for custom styling
const Container = styled(Paper)`
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

const PokemonName = styled.div`
  font-size: 5rem;
  margin-bottom: 0px;
  font-family: "Courier New", Courier;
  font-weight: 800;
  @media screen and (max-width: 640px) {
    font-size: 3.5rem;
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 0px;
`;

const TypeContainer = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const TypeBox = styled.div`
  background-color: ${(props) => props.color};
  color: grey;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
  margin-right: 10px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatItem = styled.div`
  /* margin-bottom: 10px; */
`;

const PokemonDetails = ({ pokemon }) => {
  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Container>
      <PokemonName>{capitalizeFirstLetter(pokemon.name)}</PokemonName>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <PokemonImage
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <TypeContainer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {pokemon.types.map((type) => (
              <TypeBox key={type.type.name}>
                {capitalizeFirstLetter(type.type.name)}
              </TypeBox>
            ))}
          </TypeContainer>
        </div>
        <div>
          <StatsContainer>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                fontFamily: "initial",
                fontWeight: "600",
              }}
            >
              Abilities
            </Typography>
            <ul>
              {pokemon.abilities.map((ability) => (
                <StatItem key={ability.ability.name}>
                  {capitalizeFirstLetter(ability.ability.name)}
                </StatItem>
              ))}
            </ul>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                fontFamily: "initial",
                fontWeight: "600",
              }}
            >
              Base Stats
            </Typography>
            <ul>
              {pokemon.stats.map((stat) => (
                <StatItem key={stat.stat.name}>
                  {`${capitalizeFirstLetter(stat.stat.name)}: ${
                    stat.base_stat
                  }`}
                </StatItem>
              ))}
            </ul>
          </StatsContainer>
        </div>
      </div>
    </Container>
  );
};

export default PokemonDetails;
