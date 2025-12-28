import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ تصحيح المسارات (نصعد مستويين)
import SearchBar from "../../components/SearchBar";
import FilterOptions from "../../components/FilterOptions";
import PokemonCard from "../../components/PokemonCard";
import PokemonDetailsPopUp from "../../components/PokemonDetailsPopUp";

import styled from "styled-components";
import { CircularProgress, Backdrop } from "@mui/material";
import { motion } from "framer-motion";

const StyledHomepage = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.div)`
  color: #222;
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const SearchandFilter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 30px;
`;

const CardsGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 40px;
  justify-items: center;
`;

const CardWrapper = styled(motion.div)`
  cursor: pointer;
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoResults = styled(motion.div)`
  margin-top: 40px;
  font-size: 1.8rem;
  color: #555;
`;

const Homepage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPokemonOfType, setSelectedPokemonOfType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        setPokemonList(res.data.results);
        setFilteredPokemonList(res.data.results);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    if (!selectedType) return;

    const fetchByType = async () => {
      setIsFiltering(true);
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/type/${selectedType}`
        );
        setSelectedPokemonOfType(
          res.data.pokemon.map((p) => p.pokemon.name)
        );
      } catch (e) {
        console.error(e);
      }
      setIsFiltering(false);
    };

    fetchByType();
  }, [selectedType]);

  useEffect(() => {
    let list = pokemonList;

    if (selectedType && selectedPokemonOfType.length) {
      list = list.filter((p) =>
        selectedPokemonOfType.includes(p.name)
      );
    }

    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setFilteredPokemonList(
          list.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setFilteredPokemonList(list);
    }
  }, [pokemonList, searchTerm, selectedType, selectedPokemonOfType]);

  const handleClickPokemon = async (name) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setSelectedPokemon(res.data);
      setIsModalOpen(true);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <StyledHomepage>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pokémon Explorer
      </Title>

      <SearchandFilter>
        <SearchBar onSearch={setSearchTerm} onChange={setSearchTerm} />
        <FilterOptions
          types={["fire", "water", "grass", "bug", "flying", "poison"]}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </SearchandFilter>

      <CardsGrid>
        {filteredPokemonList.length ? (
          filteredPokemonList.map((pokemon) => (
            <CardWrapper
              key={pokemon.name}
              whileHover={{ scale: 1.07 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleClickPokemon(pokemon.name)}
            >
              <PokemonCard pokemon={pokemon} />
            </CardWrapper>
          ))
        ) : (
          <NoResults>No Pokémon found</NoResults>
        )}
      </CardsGrid>

      <PokemonDetailsPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedPokemon={selectedPokemon}
      />

      {(isLoading || isSearching || isFiltering) && (
        <Backdrop open>
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        </Backdrop>
      )}
    </StyledHomepage>
  );
};

export default Homepage;