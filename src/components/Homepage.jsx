import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonDetails from "./PokemonDetails";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";
import styled from "styled-components";
import { Grid, Modal, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledHomepage = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Title = styled.div`
  color: #222;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  @media only screen and (min-width: 768px) {
    color: #222;
    font-size: 5rem;
    font-weight: 700;
    text-align: center;
  }
`;

const SearchandFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const StyledGridItem = styled(Grid)`
  cursor: pointer;
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

const PokemonImage = styled.img`
  width: 120px;
  height: 120px;
  background-color: lightcyan;
  border-radius: 50%;
`;

const StyledModalContent = styled(Paper)`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  @media screen and (max-width: 900px) {
    max-height: 80vh;
    overflow-y: auto;
    padding: 5px;
  }
`;

const CloseButton = styled(IconButton)`
  position: fixed;
  top: 5px;
  right: 5px;
`;

const Homepage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemonOfType, setSelectedPokemonOfType] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        setPokemonList(response.data.results);
        setFilteredPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const fetchPokemonOfType = async () => {
      if (selectedType) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          const pokemonOfType = response.data.pokemon.map(
            (pokemon) => pokemon.pokemon.name
          );
          setSelectedPokemonOfType(pokemonOfType);
        } catch (error) {
          console.error(
            `Error fetching Pokémon of type ${selectedType}:`,
            error
          );
        }
      }
    };

    fetchPokemonOfType();
  }, [selectedType]);

  useEffect(() => {
    let filteredList = pokemonList;

    if (selectedType && selectedPokemonOfType.length > 0) {
      filteredList = filteredList.filter((pokemon) =>
        selectedPokemonOfType.includes(pokemon.name)
      );
    }

    if (searchTerm) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPokemonList(filteredList);
  }, [pokemonList, searchTerm, selectedType, selectedPokemonOfType]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleClickPokemon = async (name) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setSelectedPokemon(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Error fetching details for Pokemon ${name}:`, error);
    }
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Trigger search when Enter key is pressed
      handleSearch(event.target.value);
    }
  };

  return (
    <StyledHomepage>
      <Title>Pokémon Explorer</Title>
      <SearchandFilter>
        <SearchBar onSearch={handleSearch} onKeyPress={handleKeyPress} />
        <FilterOptions
          types={[
            "fire",
            "water",
            "grass",
            "electric",
            "bug",
            "flying",
            "poison",
          ]}
          selectedType={selectedType}
          onSelectType={handleTypeSelect}
        />
      </SearchandFilter>
      <StyledGrid container spacing={2}>
        {filteredPokemonList.map((pokemon) => (
          <StyledGridItem
            item
            key={pokemon.name}
            xs={6}
            sm={4}
            md={3}
            onClick={() => handleClickPokemon(pokemon.name)}
          >
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
          </StyledGridItem>
        ))}
      </StyledGrid>
      <Modal open={isModalOpen} onClose={closeModal}>
        <StyledModalContent>
          <CloseButton onClick={closeModal}>
            <CloseIcon />
          </CloseButton>
          {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
        </StyledModalContent>
      </Modal>
    </StyledHomepage>
  );
};

export default Homepage;
