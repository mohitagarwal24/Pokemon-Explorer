import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar/index.jsx"; // صححت المسار حسب المشروع

describe("FilterOptions Component", () => {
  test("renders SearchBar inside FilterOptions", () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByLabelText(/search pokémon/i);
    expect(input).toBeInTheDocument();
  });
});
