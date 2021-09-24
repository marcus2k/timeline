import axios from 'axios';
import _ from 'lodash';
import server from '../utils/server';

export const getLocationSuggestions = async (searchText, longitude, latitude) => {
  try {
    let queryParams = `searchText=${searchText}`;
    if (longitude && latitude) {
      queryParams += `&longitude=${longitude}&latitude=${latitude}`
    }
    const res = await server.get(`/geolocation/locations?${queryParams}`);
    console.log(res.data)
    return res.data
  } catch (err) {
    throw err
  }
}

export const getGeographicFeature = async (latitude, longitude) => {
  try {
    const queryParams = `longitude=${longitude}&latitude=${latitude}`;
    const res = await server.get(`geolocation/features?${queryParams}`);
    return res.data.features;
  } catch (err) {
    throw err;
  }
}

export const MAPBOX_API_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

// store these somewhere else in future
// export const MAPBOX_API_TOKEN =
//   "pk.eyJ1IjoiYWN5YW5nOTciLCJhIjoiY2t0ZThvNTcwMDRwNzJybncxaTJpeG93aSJ9.0dQconyG7nAag70nDvrpew";

const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

/**
 * @param {string} newSearchValue 
 * @param {{longitude: number, latitude: number}} currentLocation 
 */
export const getLocationSuggestionss = async (newSearchValue, currentLocation) => {
  try {
    const searchTextInQuery = newSearchValue ? newSearchValue : "singapore"; // query needs to include a search text
    let searchQuery = `${url}${searchTextInQuery}.json?worldview=cn&limit=10&access_token=${MAPBOX_API_TOKEN}`;
    if (!_.isEmpty(currentLocation)) {
      searchQuery += `&proximity=${currentLocation.longitude},${currentLocation.latitude}`;
    }
    const res = await axios.get(searchQuery);
    return res;
  } catch (err) {
    throw err;
  }
}

export const getGeographicFeatures = async (latitude, longitude) => {
  try {
    let searchQuery = `${url}${longitude},${latitude}.json?worldview=cn&access_token=${MAPBOX_API_TOKEN}`;
    const res = await axios.get(searchQuery);
    return res;
  } catch (err) {
    throw err;
  }
}
