/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { getLocationSuggestions } from "../../services/locationService";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    width: "100%",
  }
}));

export const ComboBox = ({
  currentLocation,
  selectedLocation,
  setSelectedLocation,
  viewport,
  setViewport,
  lineId,
}) => {
  const classes = useStyles();
  const [predictions, setPredictions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(
    () => {
      const getSearchResults = async (newSearchValue) => {
        try {
          const suggestionsFromSearch = await getLocationSuggestions(
            newSearchValue,
            currentLocation.longitude,
            currentLocation.latitude
          );
          const suggestions = suggestionsFromSearch.map((location) => {
            return {
              place_name: location.place_name,
              geometry: location.geometry,
            };
          });
          return suggestions;
        } catch (err) {
          dispatch(setAlert(err.message, "error"));
          history.push("/");
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
    [currentLocation, debouncedSearchTerm, dispatch, history, lineId] // Only call effect if debounced search term changes
  );

  const handleChangeLocation = (event, value) => {
    setSelectedLocation(value); // selected location object
    if (value !== null) {
      setSelectedLocation({
        ...value,
        latitude: value.geometry.coordinates[1],
        longitude: value.geometry.coordinates[0],
      });
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
        value={selectedLocation}
        className={classes.autocomplete}
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
    </>
  );
};

export default ComboBox;
