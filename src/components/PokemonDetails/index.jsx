import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  bug: "#A8B820",
  flying: "#A890F0",
  poison: "#A040A0",
  electric: "#F8D030",
  default: "#A8A878",
};

const Container = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
  background: ${(props) =>
    `linear-gradient(135deg, ${typeColors[props.primaryType] || typeColors.default} 0%, #fff 100%)`};
`;

const PokemonName = styled.div`
  font-size: 5rem;
  margin-bottom: 10px;
  font-family: "Courier New", Courier;
  font-weight: 800;
  color: #222;
  @media screen and (max-width: 640px) {
    font-size: 3.5rem;
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const TypeContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const TypeBox = styled.div`
  background-color: ${(props) => typeColors[props.type] || typeColors.default};
  color: white;
  padding: 5px 12px;
  border-radius: 8px;
  font-weight: bold;
  text-transform: uppercase;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 250px;
`;

const StatItem = styled.li`
  margin-bottom: 8px;
  font-size: 1rem;
`;

const StatBarContainer = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 5px;
  height: 15px;
  margin-top: 4px;
`;

const StatBar = styled(motion.div)`
  height: 100%;
  border-radius: 5px;
  background-color: ${(props) => props.color || "#4caf50"};
`;

const FavoritesButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #FFCB05;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
  transition: all 0.3s;
`;

// دالة أصوات ناعمة جدًا
const playSoftPokemonTone = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  const waveTypes = ["sine", "triangle"];
  oscillator.type = waveTypes[Math.floor(Math.random() * waveTypes.length)];

  const frequencies = [261.63, 293.66, 329.63, 349.23, 392.0];
  oscillator.frequency.value = frequencies[Math.floor(Math.random() * frequencies.length)];

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.05);
  gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.15);
};

const PokemonDetails = ({ pokemon }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const primaryType = pokemon.types[0]?.type?.name || "default";

  const handleFavorite = () => {
    setIsFavorited(true);

    // تشغيل الصوت
    playSoftPokemonTone();

    // عرض الرسالة في أعلى يمين الشاشة
    toast.success(`${capitalizeFirstLetter(pokemon.name)} added to favorites!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });

    setTimeout(() => setIsFavorited(false), 500);
  };

  return (
    <Container
      primaryType={primaryType}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <PokemonName>{capitalizeFirstLetter(pokemon.name)}</PokemonName>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />
            <PokemonImage src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
          </div>
          <TypeContainer>
            {pokemon.types.map((type) => (
              <TypeBox key={type.type.name} type={type.type.name}>
                {capitalizeFirstLetter(type.type.name)}
              </TypeBox>
            ))}
          </TypeContainer>
          <FavoritesButton
            whileTap={{ scale: 1.2, rotate: 10 }}
            animate={isFavorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            onClick={handleFavorite}
          >
            Add to Favorites
          </FavoritesButton>
        </div>

        <div>
          <StatsContainer>
            <Typography
              style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600", marginBottom: "5px" }}
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
              style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600", marginTop: "15px", marginBottom: "5px" }}
            >
              Base Stats
            </Typography>
            <ul>
              {pokemon.stats.map((stat, index) => {
                const statPercentage = Math.min((stat.base_stat / 255) * 100, 100);
                return (
                  <StatItem key={stat.stat.name}>
                    <strong>{capitalizeFirstLetter(stat.stat.name)}</strong>: {stat.base_stat}
                    <StatBarContainer>
                      <StatBar
                        color={primaryType === "fire" ? "#F08030" : "#4caf50"}
                        initial={{ width: 0 }}
                        animate={{ width: `${statPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </StatBarContainer>
                  </StatItem>
                );
              })}
            </ul>
          </StatsContainer>
        </div>
      </div>

      {/* ToastContainer لعرض الرسائل */}
      <ToastContainer />
    </Container>
  );
};

export default PokemonDetails;