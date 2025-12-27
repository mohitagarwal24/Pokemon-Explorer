import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

const CardContainer = styled.div`
  perspective: 1000px;
  width: 180px;
  height: 260px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s ease;
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "none")};
`;

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  backface-visibility: hidden;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
`;

const CardFront = styled(CardFace)`
  background: ${({ color }) => `linear-gradient(135deg, ${color}, #ffffff)`};
`;

const CardBack = styled(CardFace)`
  background: ${({ color }) => `linear-gradient(135deg, #1c1c1c, ${color})`};
  color: white;
  transform: rotateY(180deg);
  gap: 10px;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 12px;
  object-fit: contain;
`;

const Number = styled.div`
  font-size: 0.8rem;
  color: #555;
  align-self: flex-start;
`;

const Badge = styled.div`
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.25);
  font-size: 0.7rem;
  text-transform: uppercase;
`;

const Stats = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-top: 10px;
`;

const StatBox = styled.div`
  text-align: center;
  flex: 1;
`;

const StatValue = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
`;

const PokemonName = styled.div`
  margin-top: 8px;
  font-weight: bold;
  font-size: 1rem;
  text-transform: capitalize;
  text-align: center;
`;

const PokemonCard = ({ pokemon }) => {
  const [flipped, setFlipped] = useState(false);
  const [data, setData] = useState(null);

  const id = pokemon.url.split("/")[6];
  const primaryType = data?.type;
  const color = typeColors[primaryType] || "#adb5bd";

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((res) => {
        const stats = res.data.stats;
        setData({
          type: res.data.types[0].type.name,
          attack: stats.find((s) => s.stat.name === "attack").base_stat,
          defense: stats.find((s) => s.stat.name === "defense").base_stat,
          speed: stats.find((s) => s.stat.name === "speed").base_stat,
          number: res.data.id,
        });
      })
      .catch(console.error);
  }, [pokemon.name]);

  return (
    <CardContainer
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <CardInner flipped={flipped}>
        {/* FRONT */}
        <CardFront color={color}>
          {data && <Number>#{data.number}</Number>}
          <PokemonImage
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={pokemon.name}
          />
        </CardFront>

        {/* BACK */}
        <CardBack color={color}>
          {data ? <Badge>{data.type}</Badge> : <Badge>Loading...</Badge>}
          {data && (
            <Stats>
              <StatBox>
                🗡️
                <StatValue>{data.attack}</StatValue>
                ATK
              </StatBox>
              <StatBox>
                🛡️
                <StatValue>{data.defense}</StatValue>
                DEF
              </StatBox>
              <StatBox>
                ⚡
                <StatValue>{data.speed}</StatValue>
                SPD
              </StatBox>
            </Stats>
          )}
        </CardBack>
      </CardInner>

      {/* الاسم تحت البطاقة */}
      <PokemonName>{pokemon.name}</PokemonName>
    </CardContainer>
  );
};

export default PokemonCard;