import {
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { GithubPicker } from "react-color";
import { colorPickerArray, COLORS } from "../../utils/colors";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import { editLineById, getLineDataById } from "../../services/lines";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import Loading from "../../components/Loading";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(4, 4),
    alignItems: "center",
  },
  selectColorContainer: {
    padding: theme.spacing(3, 0),
  },
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: COLORS.RED,
    color: COLORS.WHITE,
  },
  linearScaleIcon: {
    fontSize: "30pt", 
    color: COLORS.PRIMARY_PURPLE
  },
}));

const getColoredLineStyle = (color) => ({
  border: `5px solid ${color}`,
});

const EditLine = () => {
  const classes = useStyles();
  const { lineId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [lineTitle, setLineTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS.MAROON);

  useEffect(() => {
    const getLineInfo = async (lineId) => {
      const line = await getLineDataById(lineId);
      setLineTitle(line.name);
      setSelectedColor(line.colorHex);
    };
    getLineInfo(lineId);
  }, [lineId]);

  const editLine = async () => {
    if (!lineTitle) {
      dispatch(setAlert("Line Title cannot be empty", "error"));
      return;
    }
    try {
      setLoading(true);
      await editLineById(lineId, lineTitle, selectedColor);
      dispatch(setAlert("Line Successfully edited", "success"));
      history.push(`/line/${lineId}`);
    } catch (err) {
      dispatch(setAlert(err.message, "error"));
      history.push("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <PrivatePageHeader
              text={"Edit your line"}
              icon={
                <LinearScaleIcon className={classes.linearScaleIcon}/>
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Line Title"
              name="lineTitle"
              value={lineTitle}
              autoFocus
              onChange={(e) => setLineTitle(e.target.value)}
            />
            <Grid item xs={12} className={classes.selectColorContainer}>
              <Typography variant="h4">Choose your new line color</Typography>
              <hr style={getColoredLineStyle(selectedColor)} />
              {/* https://casesandberg.github.io/react-color/ */}
              <GithubPicker
                color={selectedColor}
                colors={[...colorPickerArray]}
                onChange={(newColor) => {
                  setSelectedColor(newColor.hex);
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.addLineButtonContainer}>
              <Box paddingY={1}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={editLine}
                >
                  Save Changes
                </Button>
              </Box>
              <Box paddingY={1}>
                <Button
                  fullWidth
                  className={classes.cancelButton}
                  variant="contained"
                  startIcon={<CloseIcon />}
                  onClick={() => history.push(`/line/${lineId}`)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EditLine;
