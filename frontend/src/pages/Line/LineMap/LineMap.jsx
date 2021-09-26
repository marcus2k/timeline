import React, { useState } from "react";
import MapDisplay from "./MapDisplay";
import { Box, makeStyles, Typography } from "@material-ui/core";
// To show a line map with markers of locations of the memories
// Will need the exact same data as the Line page

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}));

const DEFAULT_LATITUDE = 1.3521;
const DEFAULT_LONGITUDE = 103.8198;

const getDefaultViewport = () => ({
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  height: "100vh",
  width: "95vw",
  zoom: 10,
});

const LineMap = ({ lineMemories = [], lineColor }) => {
  const classes = useStyles();
  const latitude = lineMemories[0] ? lineMemories[0].latitude : DEFAULT_LATITUDE;
  const longitude = lineMemories[0] ? lineMemories[0].longitude : DEFAULT_LONGITUDE;
  const [viewport, setViewport] = useState({
    ...getDefaultViewport(),
    latitude,
    longitude
  });

  const memoriesData = lineMemories;

  return (
    <>
      <div className={classes.root}>
        <Box paddingY={3}>
          <Typography variant="h4" align="center">
            Tap the markers on the map below to see your memories!
          </Typography>
        </Box>
        <MapDisplay
          memoriesData={memoriesData}
          lineColor={lineColor}
          viewport={viewport}
          setViewport={setViewport}
        />
      </div>
    </>
  );
};

export default LineMap;
