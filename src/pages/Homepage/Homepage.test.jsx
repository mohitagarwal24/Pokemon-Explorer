import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Homepage from "./index";

jest.mock("axios");

const mockData = {
  data: {
    results: [{ name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" }],
  },
};

describe("Homepage Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockData);
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
