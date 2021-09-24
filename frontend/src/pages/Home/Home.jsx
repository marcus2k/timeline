import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LineCard from "./LineCard";
import { Box, Button, TextField, Tooltip, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../actions/alert";
import PrivatePageHeader from "../../components/layout/PrivatePageHeader";
import { COLORS } from "../../utils/colors";
import { filterLines } from "../../utils/lines";
import NoneAvailable from "../../components/NoneAvailable";
import FadeIn from "react-fade-in/lib/FadeIn";
import { getLines } from "../../actions/line";

const useStyles = makeStyles((theme) => ({
  addLineButtonContainer: {
    justifyContent: "center",
    width: "100%",
  },
  linesContainer: {
    padding: theme.spacing(2, 2, 8, 2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textFieldContainer: {
    padding: theme.spacing(1, 0, 1, 0),
  },
}));

const Home = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  // const [lines, setLines] = useState([]);
  const [searchText, setSearchtext] = useState("");
  // const [lines, setLines] = useState(mockLinesData);
  const history = useHistory();
  const dispatch = useDispatch();
  const lines = useSelector((state) => state.lines.onlineLines);
  const draftLines = useSelector((state) => state.lines.draftLines);

  useEffect(() => {
    const getLinesByUser = async () => {
      try {
        dispatch(getLines());
      } catch (err) {
        dispatch(
          setAlert(
            "Oops, failed to get the lines, please try refreshing!",
            "error"
          )
        );
      }
    };
    getLinesByUser();
  }, [dispatch]);

  const onAddLineClick = () => {
    history.push("/add-line");
  };

  const filteredLines = () => {
    return filterLines(searchText, lines);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        {/* TODO: Add some info on how to use the app if there are no lines at first */}
        <Grid container className={classes.linesContainer}>
          <Grid item xs={12} className={classes.addLineButtonContainer}>
            <PrivatePageHeader
              text={"Home"}
              icon={
                <Tooltip title="Add/ find lines to create your memory!">
                  <HomeIcon
                    style={{ fontSize: "30pt", color: COLORS.PRIMARY_PURPLE }}
                  />
                </Tooltip>
              }
            />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddLineClick}
            >
              Add Line
            </Button>
            <Box paddingY={1}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Search Lines"
                autoFocus
                onChange={(e) => setSearchtext(e.target.value)}
              >
                {searchText}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {draftLines.length > 0 && (
              <>
                <Typography variant="h3">Drafts</Typography>
                {draftLines.map((draftLine) => (
                  <Grid item xs={12} key={draftLine.lineId}>
                    <LineCard line={draftLine} draft={true} />
                  </Grid>
                ))}
              </>
            )}
            <FadeIn>
              <Typography variant="h3">Lines</Typography>
              {searchText === "" ? (
                lines.map((line) => (
                  <Grid item xs={12} key={line.lineId}>
                    <LineCard line={line} />
                  </Grid>
                ))
              ) : filteredLines().length > 0 ? (
                filteredLines().map((line) => (
                  <Grid item xs={12} key={line.lineId}>
                    <LineCard line={line} />
                  </Grid>
                ))
              ) : (
                <NoneAvailable text={"No lines that matched search"} />
              )}
              {lines.length === 0 && (
                <NoneAvailable text={"No lines created yet, create one now!"} />
              )}
            </FadeIn>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Home;
