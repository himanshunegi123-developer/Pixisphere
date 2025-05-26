import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Button,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from '@mui/material';

export default function Sidebar({
  onFilterChange,
  photographers,
  sidebarOpen,
  setSidebarOpen,
}) {
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 20000]); 
  const [rating, setRating] = useState('');
  const [styles, setStyles] = useState({
    Traditional: false,
    Candid: false,
    Studio: false,
    Outdoor: false,
    Indoor: false,
  });
  const [city, setCity] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [cityOptions, setCityOptions] = useState([]);

  // Extract unique cities
  useEffect(() => {
    if (photographers && photographers.length) {
      const uniqueCities = Array.from(new Set(photographers.map(p => p.location))).sort();
      setCityOptions(uniqueCities);
    }
  }, [photographers]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleStyleChange = (event) => {
    const { name, checked } = event.target;
    setStyles(prev => ({ ...prev, [name]: checked }));
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Called when user clicks "Apply Filters"
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        rating,
        styles,
        city,
        sortOption,
      });
    }
    setSidebarOpen(false); // Close sidebar after applying filters
  };

  // Toggle drawer from button click
  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* Button to open drawer
      {!sidebarOpen && (
        <Button variant="contained" onClick={toggleDrawer} sx={{ mb: 1 }}>
          Filters
        </Button>
      )} */}

      <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <i className="ri-menu-line" style={{ fontSize: 32 }}></i>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={20000}
            step={500}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" gutterBottom>
            Ratings
          </Typography>
          <Select
            fullWidth
            value={rating}
            onChange={handleRatingChange}
            displayEmpty
            sx={{ mb: 3 }}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="4">4+ Stars</MenuItem>
            <MenuItem value="3">3+ Stars</MenuItem>
            <MenuItem value="2">2+ Stars</MenuItem>
            <MenuItem value="1">1+ Stars</MenuItem>
          </Select>

          <Typography variant="subtitle1" gutterBottom>
            Styles
          </Typography>
          <FormGroup sx={{ mb: 3 }}>
            {Object.keys(styles).map((style) => (
              <FormControlLabel
                key={style}
                control={
                  <Checkbox
                    checked={styles[style]}
                    onChange={handleStyleChange}
                    name={style}
                  />
                }
                label={style}
              />
            ))}
          </FormGroup>

          <Typography variant="subtitle1" gutterBottom>
            City
          </Typography>
          <Select
            fullWidth
            value={city}
            onChange={handleCityChange}
            displayEmpty
            sx={{ mb: 3 }}
          >
            <MenuItem value="">All Cities</MenuItem>
            {cityOptions.map((cityName) => (
              <MenuItem key={cityName} value={cityName}>
                {cityName}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="subtitle1" gutterBottom>
            Sort By
          </Typography>
          <RadioGroup value={sortOption} onChange={handleSortChange} sx={{ mb: 3 }}>
            <FormControlLabel value="priceLowHigh" control={<Radio />} label="Price: Low to High" />
            <FormControlLabel value="ratingHighLow" control={<Radio />} label="Rating: High to Low" />
            <FormControlLabel value="recent" control={<Radio />} label="Recently Added" />
          </RadioGroup>

          {/* Apply Filters Button */}
          <Button variant="contained" fullWidth onClick={applyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
