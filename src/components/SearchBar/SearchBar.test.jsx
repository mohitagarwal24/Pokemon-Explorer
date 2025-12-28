import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar/index.jsx";

describe("SearchBar Component", () => {
  test("calls onSearch when typing", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByLabelText(/search pokémon/i);
    await userEvent.type(input, "pikachu");
    expect(onSearchMock).toHaveBeenCalled();
  });

  test("calls onSearch on submit", async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByLabelText(/search pokémon/i);
    await userEvent.type(input, "pikachu{enter}");
    expect(onSearchMock).toHaveBeenCalled();
  });
});
