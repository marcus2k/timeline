import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { convertUTCtoLocalDisplay } from "../../utils/datetime";
import { useDispatch } from "react-redux";
import { createDraftLineWhenOnline, deleteDraftLine } from "../../actions/line";
import { ClipLoader } from "react-spinners";
import { COLORS } from "../../utils/colors";
// import HorizontalTimeline from "react-horizontal-timeline";
// https://www.npmjs.com/package/react-vertical-timeline-component
// https://www.npmjs.com/package/react-horizontal-timeline

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "20px",
    textAlign: "center",
    margin: theme.spacing(1, 0),
    position: "relative",
    zIndex: 0,
  },
  cardActionsContainer: {
    justifyContent: "center",
    paddingBottom: theme.spacing(3),
  },
  latestMemoryImage: {
    // maxWidth: "100px",
    maxHeight: "100px",
  },
}));

const LineCard = ({ line, draft = false }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const retryCreateDraft = async () => {
    try {
      setLoading(true);
      dispatch(
        createDraftLineWhenOnline(line.name, line.colorHex, line.lineId)
      );
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDraft = () => {
    dispatch(deleteDraftLine(line.lineId));
  };

  if (loading) {
    return (
      <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={30} />
    );
  }
  return (
    <>
      <Box
        component={Card}
        boxShadow={3}
        bgcolor="background.paper"
        p={1}
        className={classes.card}
        variant="outlined"
      >
        <CardContent>
          <Grid container>
            <Grid item xs={line.thumbnailUrl ? 8 : 12}>
              <Box paddingTop={1}>
                <Typography variant="h3" align="left">
                  {line.name}
                </Typography>
              </Box>
              <Box paddingY={1}>
                <Typography variant="body1" align="left">
                  Last Updated At: &nbsp;
                  {convertUTCtoLocalDisplay(line.lastUpdatedDate)}
                </Typography>
              </Box>
              <hr
                style={{
                  border: `5px solid ${line.colorHex}`,
                }}
              />
            </Grid>
            {!draft && line.thumbnailUrl && (
              <Grid item xs={4}>
                <Box paddingLeft={3}>
                  <img
                    src={line.thumbnailUrl}
                    alt={line.memoryTitle}
                    className={classes.latestMemoryImage}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
        {!draft && (
          <CardActions className={classes.cardActionsContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                history.push(`/line/${line.lineId}`);
              }}
              style={{ textTransform: "none" }}
            >
              <Typography variant="body1">View/ Add Memories</Typography>
            </Button>
          </CardActions>
        )}
        {draft && (
          <CardActions className={classes.cardActionsContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => retryCreateDraft()}
              style={{ textTransform: "none" }}
            >
              <Typography variant="body1">Retry Create</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={deleteDraft}
              style={{ textTransform: "none" }}
            >
              <Typography variant="body1">Delete Draft</Typography>
            </Button>
          </CardActions>
        )}
      </Box>
    </>
  );
};

export default LineCard;
