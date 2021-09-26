import React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import LocationOn from "@material-ui/icons/LocationOn";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { COLORS } from "../../utils/colors";

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const useStyles = makeStyles(() => ({
  locationIcon: {
    color: COLORS.RED,
  },
}));

const MapDisplay = ({ selectedLocation, viewport }) => {
  const classes = useStyles();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        scrollZoom={false}
        dragPan={false}
        dragRotate={false}
      >
        {selectedLocation && (
          <Marker
            latitude={selectedLocation.geometry.coordinates[1]}
            longitude={selectedLocation.geometry.coordinates[0]}
            // https://github.com/visgl/react-map-gl/issues/1052
            offsetTop={-30}
            offsetLeft={-24}
          >
            <IconButton onClick={() => setShowPopup(true)}>
              <LocationOn className={classes.locationIcon} />
            </IconButton>
          </Marker>
        )}
        {showPopup ? (
          <Popup
            latitude={selectedLocation.geometry.coordinates[1]}
            longitude={selectedLocation.geometry.coordinates[0]}
            onClose={() => setShowPopup(false)}
          >
            <div>
              <Typography variant="body1">
                {selectedLocation.place_name}
              </Typography>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </>
  );
};

export default MapDisplay;
