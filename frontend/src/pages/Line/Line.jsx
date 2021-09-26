import React, { useState, useEffect } from "react";
import Timeline from "@material-ui/lab/Timeline";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { getLineDataById } from "../../services/lines";
import MemoryCard from "./MemoryCard";
import EditIcon from "@material-ui/icons/Edit";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import DeleteIcon from "@material-ui/icons/Delete";
import ExploreIcon from "@material-ui/icons/Explore";
import AddIcon from "@material-ui/icons/Add";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { useHistory, useParams } from "react-router-dom";
import { COLORS } from "../../utils/colors";
import DeleteLineDialog from "./DeleteLineDialog";
import Loading from "../../components/Loading";
import LineMap from "./LineMap/LineMap";
import NoneAvailable from "../../components/NoneAvailable";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles((theme) => ({
  mapButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.BLUE,
  },
  deleteButton: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.CANCEL_BUTTON,
  },
  addMemoryButton: {
    color: COLORS.BLACK,
    backgroundColor: COLORS.LIGHT_GREEN,
  },
}));

const Line = (props) => {
  const classes = useStyles();
  const { lineId } = useParams();
  const history = useHistory();
  // const { title, color, memoryIds } = getLineInfo(lineId);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  // https://stackoverflow.com/questions/56608065/fix-cant-perform-a-react-state-update-on-an-unmounted-component-error
  const [deleted, setDeleted] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [title, setLineTitle] = useState("");
  const [lineMemories, setLineMemories] = useState([]);
  const [lineColor, setLineColor] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const getLineMemories = async () => {
      setLoading(true);
      try {
        const lineData = await getLineDataById(lineId);
        setLineTitle(lineData.name);
        setLineColor(lineData.colorHex);
        setLineMemories(lineData.memories ? lineData.memories : []);
      } catch(e) {
        dispatch(setAlert("Failed to retrieve line", "error"));
        history.push("/");
      } finally {
        setLoading(false);
      }
    };
    getLineMemories();
  }, [lineId, dispatch, history]);

  useEffect(() => {
    if (deleted) {
      history.push("/");
    }
  }, [deleted, history]);

  const memoriesData = lineMemories;

  const lineSize = memoriesData.length;

  const isFirstMemory = (idx) => idx === 0;
  const isLastMemory = (idx) => idx === lineSize - 1;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box paddingTop={3} paddingBottom={6}>
        <Box display="flex" justifyContent="center">
          <PrivatePageHeader text={title} />
        </Box>
        <Box paddingTop={2}>
          <Grid container>
            <Grid item xs={6}>
              <Box paddingX={3} paddingBottom={1}>
                <Tooltip
                  title={showMap ? "Toggle timeline view" : "Toggle map view"}
                >
                  <Button
                    onClick={() => setShowMap(!showMap)}
                    fullWidth
                    className={classes.mapButton}
                    variant="contained"
                    startIcon={!showMap ? <ExploreIcon /> : <LinearScaleIcon />}
                  >
                    <Typography variant="body2">
                      {!showMap ? "map" : "timeline"}
                    </Typography>
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box paddingX={3} paddingBottom={1}>
                <Tooltip title="Add a new memory">
                  <Button
                    onClick={() => {
                      history.push(`/line/${lineId}/add-memory`);
                    }}
                    fullWidth
                    variant="contained"
                    className={classes.addMemoryButton}
                    startIcon={<AddIcon />}
                  >
                    <Typography variant="body2">Memory</Typography>
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box paddingX={3}>
                <Tooltip title="Edit your line title/ color">
                  <Button
                    onClick={() => {
                      history.push(`/edit-line/${lineId}`);
                    }}
                    fullWidth
                    variant="contained"
                    startIcon={<EditIcon />}
                  >
                    <Typography variant="body2">Edit</Typography>
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box paddingX={3}>
                <Tooltip title="Delete this line">
                  <Button
                    onClick={() => {
                      setDisplayDeleteDialog(!displayDeleteDialog);
                    }}
                    fullWidth
                    className={classes.deleteButton}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                  >
                    <Typography variant="body2">Delete</Typography>
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <FadeIn>
          {showMap ? (
            <Box display="flex" justifyContent="center">
              <LineMap
                lineColor={lineColor}
                lineMemories={memoriesData}
              />
            </Box>
          ) : (
            <Timeline align="left">
              {memoriesData.length > 0 ? (
                memoriesData.map((memory, idx) => 
                  <MemoryCard
                    isFirst={isFirstMemory(idx)}
                    isLast={isLastMemory(idx)}
                    memoryId={memory.memoryId}
                    key={memory.memoryId}
                    title={memory.title}
                    mediaUrl={memory.thumbnailUrl}
                    date={memory.creationDate}
                    color={lineColor}
                  />
                )
              ) : (
                <NoneAvailable
                  text={"No memories added yet, add your first memory now!"}
                />
              )}
            </Timeline>
          )}
        </FadeIn>
        <DeleteLineDialog
          displayDeleteDialog={displayDeleteDialog}
          setDisplayDeleteDialog={setDisplayDeleteDialog}
          setLoading={setLoading}
          lineId={lineId}
          setDeleted={setDeleted}
        />
      </Box>
    </>
  );
};

export default Line;
