import React, { useState } from "react";
import MapDisplay from "./MapDisplay";
import { memoriesMockData } from "./data";
import { Box, makeStyles, Typography } from "@material-ui/core";
// To show a line map with markers of locations of the memories
// Will need the exact same data as the Line page

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
  },
}));

// TODO: send memoryData here
const LineMap = ({ lineMemories = [], lineColor }) => {
  const classes = useStyles();
  const { latitude, longitude } = memoriesMockData[0];
  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    height: "100vh",
    width: "95vw",
    zoom: 10,
  });

  const useFakeData = true;

  return (
    <>
      <div className={classes.root}>
        <Box paddingY={3}>
          <Typography variant="h4" align="center">
            Tap the markers on the map below to see your memories!
          </Typography>
        </Box>
        <MapDisplay
          memoriesData={useFakeData ? memoriesMockData : lineMemories}
          lineColor={lineColor}
          viewport={viewport}
          setViewport={setViewport}
        />
      </div>
    </>
  );
};

export default LineMap;
