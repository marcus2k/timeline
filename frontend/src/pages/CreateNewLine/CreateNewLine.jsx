import {
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { GithubPicker } from "react-color";
import { colorPickerArray, COLORS } from "../../utils/colors";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";
import { createLineAction } from "../../actions/line";
import { logEvent } from "firebase/analytics";
import { googleAnalytics } from "../../services/firebase";

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
  linearScaleIcon: {
    fontSize: "30pt", 
    color: COLORS.PRIMARY_PURPLE
  },
  chooseColorInstruction: {
    color: COLORS.BLACK,
  },
}));

const getColoredLineStyle = (color) => ({
  border: `5px solid ${color}`,
});

const CreateNewLine = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [lineTitle, setLineTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLORS.MAROON);

  const createLine = async () => {
    if (!lineTitle) {
      dispatch(setAlert("Line Title cannot be empty", "error"));
      return;
    }
    try {
      setLoading(true);
      dispatch(createLineAction(lineTitle, selectedColor));
    } catch (err) {
      // dispatch(setAlert(err.message, "error"));
    } finally {
      setLoading(false);
      logEvent(googleAnalytics, "create_line");
      history.push("/");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.container}>
            <PrivatePageHeader
              text={"Create a new line"}
              icon={
                <Tooltip title="Create a line to add memories to it!">
                  <LinearScaleIcon
                    className={classes.linearScaleIcon}
                  />
                </Tooltip>
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Line Title"
              name="lineTitle"
              autoFocus
              onChange={(e) => setLineTitle(e.target.value)}
            >
              {lineTitle}
            </TextField>
            <Grid item xs={12} className={classes.selectColorContainer}>
              <Typography variant="h4" className={classes.chooseColorInstruction}>
                Choose your line color
              </Typography>
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
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={createLine}
              >
                Create Line
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CreateNewLine;
