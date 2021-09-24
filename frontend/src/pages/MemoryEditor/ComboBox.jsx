/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { getLocationSuggestions } from "../../services/locationService";
import useDebounce from "../../hooks/useDebounce";

export const ComboBox = ({
  currentLocation,
  selectedLocation,
  setSelectedLocation,
  viewport,
  setViewport,
}) => {
  const [predictions, setPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      const getSearchResults = async (newSearchValue) => {
        try {
          const res = await getLocationSuggestions(
            newSearchValue,
            currentLocation.longitude,
            currentLocation.latitude
          );
          const suggestions = res.suggestions.map((location) => {
            return {
              place_name: location.place_name,
              geometry: location.geometry,
            };
          });
          return suggestions;
        } catch (err) {
          console.log(err.message);
        } finally {
        }
      };

      if (debouncedSearchTerm) {
        setIsSearching(true);
        getSearchResults(debouncedSearchTerm).then((suggestions) => {
          setIsSearching(false);
          setPredictions(suggestions);
        });
      } else {
        setPredictions([]);
        setIsSearching(false);
      }
    },
    [currentLocation, debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleChangeLocation = (event, value) => {
    setSelectedLocation(value); // selected location object
    if (value !== null) {
      setViewport({
        ...viewport,
        latitude: value.geometry.coordinates[1],
        longitude: value.geometry.coordinates[0],
        zoom: 13,
      });
      setSearchTerm("");
    }
  };

  // Need a default 'search' parameter as it is required by the mapbox apo
  const handleInputChange = async (e, newSearchValue) => {
    setSearchTerm(newSearchValue ? newSearchValue : "Singapore");
  };

  return (
    <>
      <Autocomplete
        id="place_name"
        options={predictions}
        getOptionLabel={(option) => option.place_name}
        getOptionSelected={(option, value) => (option.id = value.place_name)}
        onChange={handleChangeLocation}
        style={{ width: "100%" }}
        value={selectedLocation}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Location"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isSearching ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {/* just to show that it works */}
      <Typography variant="body1">for testing</Typography>
      <Typography variant="body1">
        place_name: {selectedLocation && selectedLocation.place_name}
      </Typography>
      <Typography variant="body1">
        coordinates:{" "}
        {selectedLocation &&
          `longitude: ${selectedLocation.geometry.coordinates[0]}, latitude: 
         ${selectedLocation.geometry.coordinates[1]}`}
      </Typography>
    </>
  );
};

export default ComboBox;
