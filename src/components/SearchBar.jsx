import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={9}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Pokémon"
          value={searchTerm}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          style={{ width: "80px", height: "48px" }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
