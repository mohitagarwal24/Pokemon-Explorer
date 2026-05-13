import React, { useMemo, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { IconButton, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styled from "styled-components";
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
  normal: "#A8A878",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  default: "#A8A878",
};

const Container = styled(motion.section)`
  width: min(860px, calc(100vw - 32px));
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(20, 20, 20, 0.08);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
  overflow: hidden;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 330px) 1fr;
  min-height: 340px;
  background: ${({ $primaryType }) =>
    `linear-gradient(135deg, ${typeColors[$primaryType] || typeColors.default}, #ffffff 72%)`};

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ArtworkPanel = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 320px;
  padding: 24px;
`;

const ArtworkStage = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 8px;
`;

const Artwork = styled(motion.img)`
  width: 220px;
  height: 220px;
  object-fit: contain;
  justify-self: center;
  filter: drop-shadow(0 18px 20px rgba(0, 0, 0, 0.2));

  @media screen and (max-width: 520px) {
    width: 180px;
    height: 180px;
  }
`;

const SpriteLabel = styled.div`
  min-height: 28px;
  text-align: center;
  font-weight: 800;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.62);
  letter-spacing: 0;
`;

const InfoPanel = styled.div`
  padding: 26px 30px 24px 14px;

  @media screen and (max-width: 760px) {
    padding: 0 24px 24px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const PokemonName = styled.h2`
  margin: 0;
  color: #222;
  font-size: clamp(2.5rem, 8vw, 4.75rem);
  line-height: 0.92;
  font-family: "Courier New", Courier, monospace;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: capitalize;
  overflow-wrap: anywhere;
`;

const PokemonNumber = styled.div`
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.52);
  font-weight: 800;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0;
`;

const TypeBox = styled.span`
  min-width: 68px;
  text-align: center;
  background-color: ${({ $type }) => typeColors[$type] || typeColors.default};
  color: #fff;
  padding: 7px 12px;
  border-radius: 999px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.78rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 18px 0 12px;

  @media screen and (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const MetricBox = styled.div`
  min-height: 78px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.72);
  padding: 12px;
`;

const MetricLabel = styled.div`
  color: rgba(0, 0, 0, 0.58);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const MetricValue = styled.div`
  margin-top: 6px;
  color: #202020;
  font-size: 1.25rem;
  font-weight: 900;
`;

const TabPanel = styled.div`
  min-height: 230px;
  padding-top: 18px;
`;

const StatList = styled.div`
  display: grid;
  gap: 12px;
`;

const StatItem = styled.div`
  display: grid;
  grid-template-columns: 128px 42px 1fr;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const StatName = styled.div`
  font-weight: 800;
  text-transform: capitalize;
`;

const StatValue = styled.div`
  font-weight: 900;
`;

const StatBarContainer = styled.div`
  height: 14px;
  width: 100%;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.1);
`;

const StatBar = styled(motion.div)`
  height: 100%;
  border-radius: 999px;
  background-color: ${({ $color }) => $color || "#4caf50"};
`;

const AbilityList = styled.div`
  display: grid;
  gap: 10px;
`;

const AbilityButton = styled.button`
  width: 100%;
  min-height: 54px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: ${({ $active }) => ($active ? "rgba(255, 203, 5, 0.24)" : "#fff")};
  color: #222;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  font-weight: 800;
  text-transform: capitalize;
`;

const AbilityMeta = styled.div`
  margin-top: 10px;
  padding: 12px 14px;
  border-left: 4px solid #ffcb05;
  background: rgba(255, 203, 5, 0.12);
  border-radius: 0 10px 10px 0;
  color: #363636;
`;

const MoveGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MovePill = styled.span`
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.08);
  padding: 7px 12px;
  font-size: 0.86rem;
  font-weight: 700;
  text-transform: capitalize;
`;

const EmptyText = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.62);
`;

const FAVORITES_KEY = "pokemon-explorer:favorites";

const capitalize = (value = "") =>
  value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

const readFavorites = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeFavorites = (favorites) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

const playSoftPokemonTone = () => {
  if (typeof window === "undefined") {
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = 329.63;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 0.04);
  gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.18);
};

const getSpriteOptions = (pokemon) => [
  {
    label: "Front",
    src: pokemon.sprites?.front_default,
  },
  {
    label: "Back",
    src: pokemon.sprites?.back_default,
  },
  {
    label: "Shiny",
    src: pokemon.sprites?.front_shiny,
  },
].filter((sprite) => Boolean(sprite.src));

const PokemonDetails = ({ pokemon }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [spriteIndex, setSpriteIndex] = useState(0);
  const [expandedAbility, setExpandedAbility] = useState(null);
  const [favorites, setFavorites] = useState(readFavorites);

  const primaryType = pokemon.types[0]?.type?.name || "default";
  const accentColor = typeColors[primaryType] || typeColors.default;
  const sprites = useMemo(() => getSpriteOptions(pokemon), [pokemon]);
  const selectedSprite = sprites[spriteIndex] || sprites[0];
  const baseStatTotal = pokemon.stats.reduce(
    (total, stat) => total + stat.base_stat,
    0
  );
  const isFavorite = favorites.includes(pokemon.name);

  const handleFavorite = () => {
    const nextFavorites = isFavorite
      ? favorites.filter((name) => name !== pokemon.name)
      : [...favorites, pokemon.name];

    setFavorites(nextFavorites);
    writeFavorites(nextFavorites);
    playSoftPokemonTone();

    toast.success(
      `${capitalize(pokemon.name)} ${isFavorite ? "removed from" : "added to"} favorites`,
      {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
    );
  };

  const handleSpriteChange = (direction) => {
    setSpriteIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;
      if (nextIndex < 0) {
        return sprites.length - 1;
      }
      if (nextIndex >= sprites.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  return (
    <Container
      aria-label={`${pokemon.name} details`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
    >
      <Hero $primaryType={primaryType}>
        <ArtworkPanel>
          <ArtworkStage>
            <Tooltip title="Previous sprite">
              <IconButton
                aria-label="previous sprite"
                onClick={() => handleSpriteChange(-1)}
                disabled={sprites.length < 2}
              >
                <NavigateBeforeIcon />
              </IconButton>
            </Tooltip>
            {selectedSprite && (
              <Artwork
                key={selectedSprite.src}
                src={selectedSprite.src}
                alt={`${pokemon.name} ${selectedSprite.label}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
            <Tooltip title="Next sprite">
              <IconButton
                aria-label="next sprite"
                onClick={() => handleSpriteChange(1)}
                disabled={sprites.length < 2}
              >
                <NavigateNextIcon />
              </IconButton>
            </Tooltip>
          </ArtworkStage>
          <SpriteLabel>{selectedSprite?.label || "Artwork"}</SpriteLabel>
        </ArtworkPanel>

        <InfoPanel>
          <HeaderRow>
            <div>
              <PokemonName>{capitalize(pokemon.name)}</PokemonName>
              <PokemonNumber>#{String(pokemon.id).padStart(3, "0")}</PokemonNumber>
            </div>
            <ActionRow>
              <Tooltip title={isFavorite ? "Remove favorite" : "Add favorite"}>
                <IconButton
                  aria-label={isFavorite ? "remove favorite" : "add favorite"}
                  onClick={handleFavorite}
                  color="error"
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Play sound">
                <IconButton aria-label="play sound" onClick={playSoftPokemonTone}>
                  <VolumeUpIcon />
                </IconButton>
              </Tooltip>
            </ActionRow>
          </HeaderRow>

          <TypeContainer>
            {pokemon.types.map((type) => (
              <TypeBox key={type.type.name} $type={type.type.name}>
                {capitalize(type.type.name)}
              </TypeBox>
            ))}
          </TypeContainer>

          <MetricsGrid>
            <MetricBox>
              <MetricLabel>Height</MetricLabel>
              <MetricValue>{(pokemon.height / 10).toFixed(1)} m</MetricValue>
            </MetricBox>
            <MetricBox>
              <MetricLabel>Weight</MetricLabel>
              <MetricValue>{(pokemon.weight / 10).toFixed(1)} kg</MetricValue>
            </MetricBox>
            <MetricBox>
              <MetricLabel>Base total</MetricLabel>
              <MetricValue>{baseStatTotal}</MetricValue>
            </MetricBox>
          </MetricsGrid>

          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            aria-label="Pokemon detail tabs"
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab label="Overview" value="overview" />
            <Tab label="Stats" value="stats" />
            <Tab label="Moves" value="moves" />
          </Tabs>

          <TabPanel>
            {activeTab === "overview" && (
              <>
                <Typography
                  component="h3"
                  sx={{ fontWeight: 900, mb: 1.5, fontSize: "1.35rem" }}
                >
                  Abilities
                </Typography>
                <AbilityList>
                  {pokemon.abilities.map((ability) => (
                    <div key={ability.ability.name}>
                      <AbilityButton
                        type="button"
                        $active={expandedAbility === ability.ability.name}
                        onClick={() =>
                          setExpandedAbility((current) =>
                            current === ability.ability.name
                              ? null
                              : ability.ability.name
                          )
                        }
                      >
                        <span>{capitalize(ability.ability.name)}</span>
                        <span>{ability.is_hidden ? "Hidden" : "Standard"}</span>
                      </AbilityButton>
                      {expandedAbility === ability.ability.name && (
                        <AbilityMeta>
                          Slot {ability.slot} ability for {capitalize(pokemon.name)}.
                        </AbilityMeta>
                      )}
                    </div>
                  ))}
                </AbilityList>
              </>
            )}

            {activeTab === "stats" && (
              <StatList>
                {pokemon.stats.map((stat, index) => {
                  const statPercentage = Math.min((stat.base_stat / 255) * 100, 100);
                  return (
                    <StatItem key={stat.stat.name}>
                      <StatName>{capitalize(stat.stat.name)}</StatName>
                      <StatValue>{stat.base_stat}</StatValue>
                      <StatBarContainer aria-label={`${stat.stat.name} stat bar`}>
                        <StatBar
                          $color={accentColor}
                          initial={{ width: 0 }}
                          animate={{ width: `${statPercentage}%` }}
                          transition={{ duration: 0.75, delay: index * 0.08 }}
                        />
                      </StatBarContainer>
                    </StatItem>
                  );
                })}
              </StatList>
            )}

            {activeTab === "moves" && (
              <MoveGrid>
                {pokemon.moves.length ? (
                  pokemon.moves.slice(0, 12).map((move) => (
                    <MovePill key={move.move.name}>{capitalize(move.move.name)}</MovePill>
                  ))
                ) : (
                  <EmptyText>No moves available</EmptyText>
                )}
              </MoveGrid>
            )}
          </TabPanel>
        </InfoPanel>
      </Hero>

      <ToastContainer />
    </Container>
  );
};

export default PokemonDetails;
