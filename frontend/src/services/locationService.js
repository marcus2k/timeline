import axios from 'axios';
export const MAPBOX_API_TOKEN = process.env.REACT_APP_MAPBOX_KEY;
const STARTING_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

export const getLocationSuggestions = async (searchText, longitude = null, latitude = null) => {
  try {
    let url = new URL(`${STARTING_URL}${searchText}.json`);
    url.searchParams.append("worldview", "cn");
    url.searchParams.append("access_token", MAPBOX_API_TOKEN);
    url.searchParams.append("limit", 10);
    if (longitude && latitude) {
      url.searchParams.append("proximity", `${longitude},${latitude}`);
    }
    const res = await axios.get(url.href);
    const suggestionsFromSearch = res.data.features.map((location) => {
      return {
        place_name: location.place_name,
        geometry: location.geometry,
      };
    });
    return suggestionsFromSearch;
  } catch (err) {
    throw err
  }
}

export const getGeographicFeature = async (latitude, longitude) => {
  try {
    let url = new URL(`${STARTING_URL}${longitude},${latitude}.json`);
    url.searchParams.append("worldview", "cn");
    url.searchParams.append("access_token", MAPBOX_API_TOKEN);
    const res = await axios.get(url.href);
    const features = res.data.features.map((location) => {
      return {
        place_name: location.place_name,
        geometry: location.geometry,
      };
    });
    if (!features || features.length === 0) {
      return {
        latitude,
        longitude
      };
    }
    return {
      place_name: features[0].place_name,
      geometry: features[0].geometry,
      latitude,
      longitude,
    };
  } catch (err) {
    throw err
  }
}
