import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = (limit = 151) => {
  return axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
};

export const getPokemonByName = (name) => {
  return axios.get(`${BASE_URL}/pokemon/${name}`);
};

export const getPokemonByType = (type) => {
  return axios.get(`${BASE_URL}/type/${type}`);
};
