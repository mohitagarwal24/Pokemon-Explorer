import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterOptions = ({ types, selectedType, onSelectType }) => {
  const handleChange = event => {
    onSelectType(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="filter-label">Filter by Type</InputLabel>
      <Select
        labelId="filter-label"
        value={selectedType}
        onChange={handleChange}
        label="Filter by Type"
      >
        <MenuItem value="">All</MenuItem>
        {types.map(type => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterOptions;
