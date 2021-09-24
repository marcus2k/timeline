import { Box, Button, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import LocationOn from "@material-ui/icons/LocationOn";
import { Marker, Popup } from "react-map-gl";
import { convertUTCtoLocalDisplay } from "../../../utils/datetime";
import { useHistory } from "react-router-dom";

const MapMarker = ({ memory }) => {
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();

  return (
    <>
      <Marker
        latitude={memory.latitude}
        longitude={memory.longitude}
        offsetTop={-30}
        offsetLeft={-24}
      >
        <IconButton onClick={() => setShowPopup(true)}>
          <LocationOn />
        </IconButton>
      </Marker>
      {showPopup ? (
        <Popup
          latitude={memory.latitude}
          longitude={memory.longitude}
          onClose={() => setShowPopup(false)}
        >
          <Box padding={1}>
            <Typography variant="h6">{memory.title}</Typography>
            <Typography variant="body1">{memory.description}</Typography>
            <Typography variant="body1">
              {convertUTCtoLocalDisplay(memory.creationDate)}
            </Typography>
            <Box paddingTop={1} display="flex" justifyContent="center">
              <Button
                onClick={() => history.push(`/memory/${memory.memoryId}`)}
                variant="contained"
              >
                <Typography variant="body2">View Memory</Typography>
              </Button>
            </Box>
          </Box>
        </Popup>
      ) : null}
    </>
  );
};

export default MapMarker;
