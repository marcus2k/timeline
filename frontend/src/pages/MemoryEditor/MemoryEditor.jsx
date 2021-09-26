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
import {
  createNewMemory,
  editMemoryDetailsById,
  getMemoryById,
} from "../../services/memories";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { getGeographicFeature } from "../../services/locationService";
import Loading from "../../components/Loading";
import { googleAnalytics } from "../../services/firebase";
import { logEvent } from "@firebase/analytics";

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
  photoIcon: {
    fontSize: "30pt", 
    color: COLORS.PRIMARY_PURPLE,
  }
}));

const DEFAULT_LONGITUDE = 103.8198;
const DEFAULT_LATITUDE = 1.3521;

// const getDefaultLocation = () => ({
//   geometry: {
//     coordinates: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
//   },
// });

const getDefaultViewport = () => ({
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  height: "50vh",
  width: "100%",
  zoom: 10,
});

const isEmpty = (val) =>
  val === null || val === undefined || val === "" || val.length === 0;

const MemoryEditor = () => {
  const classes = useStyles();
  const { memoryId, lineId: lineIdFromUrl } = useParams();
  const [currentLocation, setCurrentLocation] = useState({});
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mediaUrls, setMediaUrls] = useState([]); // blob URL
  const [loading, setLoading] = useState(false);
  const [lineId, setLineId] = useState(lineIdFromUrl);
  const [viewport, setViewport] = useState(getDefaultViewport());

  const history = useHistory();
  const dispatch = useDispatch();

  const alertError = (msg) => dispatch(setAlert(msg, "error"));

  const isEdit = memoryId ? true : false;

  useEffect(() => {
    if (!memoryId) {
      const getCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
          if (position.coords) {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        });
      };
      getCurrentLocation();
      return;
    }

    const loadExistingMemoryData = async () => {
      setLoading(true);
      try {
        const memoryData = await getMemoryById(memoryId);
        const { title, description, lineId, latitude, longitude } = memoryData;
        const feature = await getGeographicFeature(latitude, longitude);
        setSelectedLocation(feature);
        setLineId(lineId);
        setMemoryTitle(title);
        setMemoryDescription(description);
      } catch (e) {
        dispatch(setAlert("Failed to load memory info", "error"));
        history.push("/");
      } finally {
        setLoading(false);
      }
    };
    loadExistingMemoryData();
  }, [memoryId, dispatch, history]);

  const handleEditMemory = async () => {
    setLoading(true);
    try {
      await editMemoryDetailsById(
        memoryId,
        memoryTitle,
        memoryDescription,
        lineId,
        selectedLocation.longitude,
        selectedLocation.latitude
      );
    } catch (e) {
      alertError("Unable to save changes.");
    } finally {
      setLoading(false);
      history.push(`/memory/${memoryId}`);
    }
  };

  const handleNewMemoryCreation = async () => {
    setLoading(true);
    let newId = null;
    try {
      const memoryDetails = await createNewMemory(
        memoryTitle,
        lineId,
        memoryDescription,
        selectedLocation.latitude,
        selectedLocation.longitude,
        mediaUrls
      );
      newId = memoryDetails.memoryId;
      logEvent(googleAnalytics, "create_memory");
    } catch (e) {
      alertError("Unable to create memory.");
    } finally {
      setLoading(false);
      if (!newId) {
        history.push(`/line/${lineId}`);
        return;
      }
      history.push(`/memory/${newId}`);
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    if (isEmpty(memoryTitle)) {
      alertError("Title cannot be empty.");
      return;
    }
    if (isEmpty(selectedLocation)) {
      alertError("Location cannot be empty.");
      return;
    }
    if (!isEdit && isEmpty(mediaUrls)) {
      alertError("Please upload a PNG or JPG photo.");
      return;
    }

    if (isEdit) {
      handleEditMemory();
    } else {
      handleNewMemoryCreation();
    }
  };

  const mapViewport = { ...viewport, ...selectedLocation };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12}>
            <PrivatePageHeader
              text={`${isEdit ? "Edit" : "Add"} Memory`}
              icon={
                <AddAPhotoIcon className={classes.photoIcon} />
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
                viewport={mapViewport}
                setViewport={setViewport}
                lineId={lineId}
              />
            </Box>
            <Box paddingY={1}>
              <MapDisplay
                selectedLocation={selectedLocation}
                viewport={mapViewport}
              />
            </Box>
            {!isEdit && (
              <Box paddingY={1}>
                <UploadMediaForm
                  existingMediaUrls={mediaUrls} // will be empty
                  onComplete={setMediaUrls}
                />
              </Box>
            )}
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
            <Box paddingY={1} paddingBottom={3}>
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
