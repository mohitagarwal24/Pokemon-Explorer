import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonCard from "./index.jsx";
import axios from "axios";

// Mock بيانات Pokémon
const mockPokemonData = {
  name: "pikachu",
  url: "https://pokeapi.co/api/v2/pokemon/25/"
};

const mockApiResponse = {
  data: {
    id: 25,
    types: [{ type: { name: "electric" } }],
    stats: [
      { stat: { name: "attack" }, base_stat: 55 },
      { stat: { name: "defense" }, base_stat: 40 },
      { stat: { name: "speed" }, base_stat: 90 }
    ]
  }
};

// Mock axios لمنع الطلبات الحقيقية
jest.mock("axios");

describe("PokemonCard Component", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.get.mockResolvedValue(mockApiResponse);
  });

  test("renders Pokemon name and image", async () => {
    render(<PokemonCard pokemon={mockPokemonData} />);
    const name = await screen.findByText(/pikachu/i);
    const image = screen.getByAltText(/pikachu/i);
    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test("shows stats on flip", async () => {
    render(<PokemonCard pokemon={mockPokemonData} />);
    const card = screen.getByRole("img", { name: /pikachu/i }).parentElement;

    // نقلب البطاقة
    await userEvent.click(card);

    // ننتظر ظهور الإحصائيات
    await waitFor(() => {
      const atk = screen.getByText(/atk/i);
      const def = screen.getByText(/def/i);
      const spd = screen.getByText(/spd/i);

      expect(atk).toBeInTheDocument();
      expect(def).toBeInTheDocument();
      expect(spd).toBeInTheDocument();
    });
  });
});
