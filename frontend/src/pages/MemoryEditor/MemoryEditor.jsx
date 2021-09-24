import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ComboBox from "./ComboBox";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import MapDisplay from "./MapDisplay";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { COLORS } from "../../utils/colors";
import UploadMediaForm from "../UploadMediaForm/UploadMediaForm";
import { useHistory, useParams } from "react-router";
import { getMemoryById } from "../../services/memories";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { getGeographicFeature } from "../../services/locationService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  linesContainer: {
    padding: theme.spacing(2, 2, 15, 2),
  },
}));

// Use this function to convert blobURL to file
const blobToFile = (blob, fileName="default-name") => {
  const file = new File([blob], fileName, { type: "image/png" });
  return file
}

// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// TODO: pass line as a prop

const getDefaultViewport = () => ({
  latitude: 1.3521,
  longitude: 103.8198,
  height: "50vh",
  width: "100%",
  zoom: 10,
});

const isEmpty = (val) => val === null || val === undefined || val === "" || val.length === 0;

const MemoryEditor = (props) => {
  const classes = useStyles();
  const [currentLocation, setCurrentLocation] = useState({});
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mediaUrls, setMediaUrls] = useState([]); // blob URL
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [viewport, setViewport] = useState(getDefaultViewport());

  const history = useHistory();
  const dispatch = useDispatch();

  const alertError = (msg) => dispatch(setAlert(msg, "error"));

  const urlParams = useParams(); // Read params from URL
  // urlParams contain EITHER lineId (new) or memoryId (existing)
  const { memoryId, lineId } = urlParams;

  // if URL param contains memoryId, then there is existing memory
  const isEdit = memoryId ? true : false;

  const getLocationFromCoordinates = async (latitude, longitude) => {
    try {
      const features = await getGeographicFeature(latitude, longitude);
      if (!features || features.length === 0) {
        return;
      }
      const processedRes = features.map((location) => {
        return {
          place_name: location.place_name,
          geometry: location.geometry,
        };
      });
      setSelectedLocation(processedRes[0]);
    } catch (err) {
      console.log(err.message);
    }
  };
  if (isEdit && !isDataLoaded) {
    console.log("isLineIdEmpty?", isEmpty(lineId));
    // fetch memory from backend, need error handling!
    const memory = getMemoryById(memoryId);

    getLocationFromCoordinates(memory.latitude, memory.longitude);

    const existingViewport = {
      ...viewport,
      latitude: memory.latitude,
      longitude: memory.longitude,
    };

    // TODO: update component states to reflect existing memory data
    // currently MOCK data
    setSelectedLocation(null);
    setMemoryTitle(memory.title);
    setMemoryDescription(memory.description);
    setViewport(existingViewport);
    // setCurrentLocation({})

    // set isDataLoaded to true
    setIsDataLoaded(true);
  }

  //http://localhost:3000/line/1/add-memory
  const saveHandler = (e) => {
    e.preventDefault();
    if (isEmpty(memoryTitle)) {
      alertError("Title cannot be empty.");
      return;
    }
    if (isEmpty(memoryDescription)) {
      alertError("Description cannot be empty.");
      return;
    }
    if (isEmpty(selectedLocation)) {
      alertError("Location cannot be empty.");
      return;
    }
    if (isEdit && isEmpty(mediaUrls)) {
      alertError("Please upload a media.");
      return;
    }
    // TODO: convert media to FILE (not sure where yet)
    console.log("Blob To File Test", mediaUrls.map(obj => blobToFile(obj.url)));

    // TODO: maybe both can have same way of handling
    // (if backend decides to use POST for editing as well)
    if (isEdit) {
      // TODO: backend PUT request
      // save to existing memory
      // redirect back to Memory  page
      history.push(`memory/${memoryId}`);
    } else {
      // TODO: backend POST request
      // add new memory to line
      const newMemoryId = 99; // will be created by backend
      // redirect to new memory page
      history.push(`memory/${newMemoryId}`);
    }
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position.coords) {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (isEdit) {
            // do not set to current in edit mode
            return;
          }
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      });
    };
    getCurrentLocation();
  }, [viewport, isEdit]);

  // TODO: connect to backend
  // const addMemoryToLine = () => {};

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12}>
            <PrivatePageHeader
              text={`${isEdit ? "Edit" : "Add"} Memory`}
              icon={
                <AddAPhotoIcon
                  style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
                />
              }
            />
            <Box paddingY={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Memory Title"
                name="memoryTitle"
                autoFocus={!isEdit}
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
              />
            </Box>
            <Box paddingY={1}>
              <TextField
                id="filled-multiline-static"
                label="Memory Description"
                multiline
                fullWidth
                rows={4}
                placeholder="Optional"
                variant="outlined"
                margin="normal"
                value={memoryDescription}
                onChange={(e) => setMemoryDescription(e.target.value)}
              />
            </Box>
            <Box paddingY={1}>
              <ComboBox
                currentLocation={currentLocation}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                viewport={viewport}
                setViewport={setViewport}
              />
            </Box>
            <Box paddingY={1}>
              <MapDisplay
                selectedLocation={selectedLocation}
                viewport={viewport}
                setViewport={setViewport}
              />
            </Box>
            {!isEdit && 
              <Box paddingY={1}>
                <UploadMediaForm 
                  existingMediaUrls={mediaUrls} // will be empty
                  onComplete={setMediaUrls}
                />
              </Box>
            }
            {!isEdit && // TODO: REMOVE THIS BLOCK
              <p>
                [TEST] Media:{" "}
                {mediaUrls.length > 0 && (
                  <a key={mediaUrls[0].position} href={mediaUrls[0].url} rel="noreferrer" target="_blank">
                    {mediaUrls[0].url}
                  </a>
                )}
              </p>
            }
            <Box paddingY={1}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={saveHandler}
              >
                Save Memory
              </Button>
            </Box>
            <Box paddingY={1}>
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={history.goBack}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MemoryEditor;
