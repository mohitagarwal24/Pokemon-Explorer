import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonDetails from "./index.jsx";

const mockPokemon = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  sprites: {
    front_default: "front.png",
    back_default: "back.png",
    front_shiny: "shiny.png",
  },
  types: [{ type: { name: "electric" } }],
  abilities: [
    { ability: { name: "static" }, is_hidden: false, slot: 1 },
    { ability: { name: "lightning-rod" }, is_hidden: true, slot: 3 },
  ],
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
};

describe("PokemonDetails Component", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("renders overview metrics and type information", () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    expect(screen.getByRole("heading", { name: /pikachu/i })).toBeInTheDocument();
    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("Electric")).toBeInTheDocument();
    expect(screen.getByText("0.4 m")).toBeInTheDocument();
    expect(screen.getByText("6.0 kg")).toBeInTheDocument();
    expect(screen.getByText("320")).toBeInTheDocument();
  });

  test("cycles through available sprites", async () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    expect(screen.getByRole("img", { name: /pikachu front/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /next sprite/i }));
    expect(screen.getByRole("img", { name: /pikachu back/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /next sprite/i }));
    expect(screen.getByRole("img", { name: /pikachu shiny/i })).toBeInTheDocument();
  });

  test("persists favorite selection", async () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    await userEvent.click(screen.getByRole("button", { name: /add favorite/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem("pokemon-explorer:favorites")).toContain(
        "pikachu"
      );
    });
    expect(screen.getByRole("button", { name: /remove favorite/i })).toBeInTheDocument();
  });

  test("switches between stats and moves tabs", async () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    await userEvent.click(screen.getByRole("tab", { name: /stats/i }));
    expect(screen.getByText("Special attack")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: /moves/i }));
    expect(screen.getByText("Quick attack")).toBeInTheDocument();
    expect(screen.getByText("Thunder shock")).toBeInTheDocument();
  });

  test("expands ability details", async () => {
    render(<PokemonDetails pokemon={mockPokemon} />);

    await userEvent.click(screen.getByRole("button", { name: /lightning rod hidden/i }));

    expect(screen.getByText(/slot 3 ability/i)).toBeInTheDocument();
  });
});
