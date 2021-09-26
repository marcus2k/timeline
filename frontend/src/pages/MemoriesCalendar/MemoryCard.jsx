import React from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import NotFoundImage from "../../assets/not-found.png";

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
  memoryImage: {
    // maxWidth: "100px",
    objectFit: "contain",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  button: {
    textTransform: "none",
  },
}));

const MemoryCard = ({ memory }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box
        boxShadow={3}
        bgcolor="background.paper"
        p={1}
        className={classes.card}
        variant="outlined"
      >
        <CardContent>
          <Grid container>
            <Grid item xs={8}>
              <Box paddingTop={1}>
                <Typography variant="h3" align="left">
                  {memory?.title}
                </Typography>
              </Box>
              <Box paddingTop={1}>
                <Typography variant="body1" align="left">
                  {memory?.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box paddingLeft={1} paddingRight={1}>
                <img
                  src={memory?.thumbnailUrl}
                  alt={memory?.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = NotFoundImage;
                  }}
                  className={classes.memoryImage}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions className={classes.cardActionsContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push(`/memory/${memory.memoryId}`);
            }}
            className={classes.button}
          >
            <Typography variant="body1">View Memory</Typography>
          </Button>
        </CardActions>
      </Box>
    </>
  );
};

export default MemoryCard;
