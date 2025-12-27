# Components Documentation - Pokémon Explorer

## 1. Homepage.jsx
- **Purpose:** The main page of the application, displays a list of Pokémon with search and filter options, and allows opening Pokémon details.
- **Features:**
  - Fetches all Pokémon from the PokeAPI.
  - `SearchBar` to filter Pokémon by name.
  - `FilterOptions` to filter Pokémon by type.
  - `CardsGrid` to display Pokémon cards with hover/scale effects.
  - `PokemonDetailsPopUp` to show detailed information when a card is clicked.
  - Loading and Backdrop indicators during fetch, search, or filtering.
- **Hooks Used:**
  - `useState`, `useEffect` for state management and API calls.
  - Debounce for search input (500ms) to reduce unnecessary re-renders.
- **Testing:**
  - Ensure Pokémon cards are displayed after fetch.
  - Verify search and filter functionality.
  - Check that the modal opens when clicking a card.

---

## 2. PokemonCard.jsx
- **Purpose:** Displays a Pokémon card with front/back flip and stats.
- **Props:**
  - `pokemon`: object containing `name` and `url`.
- **Features:**
  - **Front:** Pokémon image and number.
  - **Back:** Pokémon type and stats (Attack, Defense, Speed).
  - Flip animation on hover or click.
  - Animated scale on hover.
  - Fetches detailed Pokémon data (stats and type) from PokeAPI.
- **Testing:**
  - Ensure Pokémon name and image are displayed.
  - Verify stats appear when flipping the card.

---

## 3. SearchBar.jsx
- **Purpose:** Input field for searching Pokémon by name.
- **Props:**
  - `onSearch`: callback triggered when search input changes.
  - `onChange`: callback triggered on input change.
  - `onKeyPress`: optional callback for handling Enter key.
- **Features:**
  - Calls `onSearch` and `onChange` on text input.
  - Search icon inside the input field.
- **Testing:**
  - Ensure `onSearch` is called while typing.
  - Ensure `onSearch` is called when pressing Enter.

---

## 4. FilterOptions.jsx
- **Purpose:** Filter Pokémon by type.
- **Props:**
  - `types`: array of Pokémon type names.
  - `selectedType`: currently selected type.
  - `onSelectType`: callback triggered when a type is selected.
- **Features:**
  - Displays buttons for each type with corresponding colors.
  - "All" button to reset and show all Pokémon.
  - Hover effect on buttons.
- **Testing:**
  - Ensure all types are displayed.
  - Ensure `onSelectType` is called when a type is selected.

---

## 5. PokemonDetailsPopUp.jsx
- **Purpose:** Modal that displays detailed Pokémon information when a card is clicked.
- **Props:**
  - `selectedPokemon`: object of the selected Pokémon.
  - `isModalOpen`: boolean to control modal open/close state.
  - `setIsModalOpen`: callback function to close the modal.
- **Features:**
  - Renders `PokemonDetails` component inside the modal.
  - Animated entrance and exit using Framer Motion.
  - Close button in the top-right corner.

---

## 6. PokemonDetails.jsx
- **Purpose:** Display detailed information about a Pokémon inside the modal.
- **Props:**
  - `pokemon`: full Pokémon object containing images, types, abilities, and stats.
- **Features:**
  - Displays front and back Pokémon images.
  - Shows Pokémon types with `TypeBox`.
  - Displays stats with animated `StatBar`.
  - "Add to Favorites" button with soft sound effect on click.
  - Toast notification confirming addition to favorites.
  - Animated entrance/exit using Framer Motion.
