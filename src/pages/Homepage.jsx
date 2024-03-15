import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import FilterOptions from "../components/FilterOptions";
import styled from "styled-components";
import { Grid } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import PokemonDetailsPopUp from "./PokemonDetailsPopUp";

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

const Homepage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemonOfType, setSelectedPokemonOfType] = useState([]);

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event.target.value);
    }
  };

  return (
    <StyledHomepage>
      <Title>Pokémon Explorer</Title>
      <SearchandFilter>
        <SearchBar onSearch={handleSearch} onKeyPress={handleKeyPress} />
        <FilterOptions
          types={["fire", "water", "grass", "bug", "flying", "poison"]}
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
            <PokemonCard
              pokemon={pokemon}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />
          </StyledGridItem>
        ))}
      </StyledGrid>
      <PokemonDetailsPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
    </StyledHomepage>
  );
};

export default Homepage;
