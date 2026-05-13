import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Homepage from "./index";

jest.mock("axios");

const mockListData = {
  data: {
    results: [{ name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }],
  },
};

const mockPokemonDetails = {
  data: {
    id: 25,
    name: "pikachu",
    height: 4,
    weight: 60,
    types: [{ type: { name: "electric" } }],
    abilities: [{ ability: { name: "static" }, is_hidden: false, slot: 1 }],
    stats: [
      { stat: { name: "hp" }, base_stat: 35 },
      { stat: { name: "attack" }, base_stat: 55 },
      { stat: { name: "defense" }, base_stat: 40 },
      { stat: { name: "special-attack" }, base_stat: 50 },
      { stat: { name: "special-defense" }, base_stat: 50 },
      { stat: { name: "speed" }, base_stat: 90 },
    ],
    moves: [
      { move: { name: "quick-attack" } },
      { move: { name: "thunder-shock" } },
    ],
    sprites: {
      front_default: "front.png",
      back_default: "back.png",
      front_shiny: "shiny.png",
      other: {
        "official-artwork": {
          front_default: "official.png",
        },
      },
    },
  },
};

describe("Homepage Component", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.get.mockImplementation((url) => {
      if (url.includes("/pokemon?limit")) {
        return Promise.resolve(mockListData);
      }

      if (url.includes("/pokemon/pikachu")) {
        return Promise.resolve(mockPokemonDetails);
      }

      if (url.includes("/type/")) {
        return Promise.resolve({
          data: {
            pokemon: [{ pokemon: { name: "pikachu" } }],
          },
        });
      }

      return Promise.resolve(mockListData);
    });
  });

  test("renders homepage title", async () => {
    render(<Homepage />);
    expect(screen.getByText(/Pokémon Explorer/i)).toBeInTheDocument();
    await waitFor(() => screen.getByText(/pikachu/i));
  });

  test("displays Pokemon cards after fetching", async () => {
    render(<Homepage />);
    const card = await screen.findByText(/pikachu/i);
    expect(card).toBeInTheDocument();
  });

  test("filters Pokemon by search term", async () => {
    render(<Homepage />);
    const input = screen.getByLabelText(/search pokémon/i);
    await userEvent.type(input, "pikachu");
    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });
});
