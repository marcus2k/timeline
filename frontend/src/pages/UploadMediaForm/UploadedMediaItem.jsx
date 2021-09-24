import React, { useState } from "react";
import { makeStyles, Grid, Box, IconButton } from "@material-ui/core";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { COLORS } from "../../utils/colors";
import DeleteMediaDialog from "./DeleteMediaDialog";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.3, 0),
  },
  iconStyle: {
    fontSize: "16px",
    backgroundColor: COLORS.WHITE,
    borderRadius: "50%",
    border: `3px solid ${COLORS.LIGHT_GREY}`,
  },
  deleteButtonContainer: {
    position: "absolute",
    bottom: "-20px",
    right: "-2px",
    "@media (max-width: 480px)": {
      right: "-15px",
    },
  },
  selectedImage: {
    width: "80%",
    height: "auto",
    border: `3px solid ${COLORS.PRIMARY_PURPLE}`,
    borderRadius: "10%",
  },
  image: {
    width: "80%",
    height: "auto",
    border: `3px solid ${COLORS.TRANSPARENT}`,
    borderRadius: "10%",
  },
}));

const UploadedMediaItem = ({
  media,
  setMediaPreview,
  deleteMediaByPosition,
  isSelected,
  isDeletable,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [displayDeleteDialog, setDisplayDeleteDialog] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid item xs={3} className={classes.root}>
          <Box position="relative">
            { isDeletable &&
              <Box className={classes.deleteButtonContainer}>
                <IconButton onClick={() => setDisplayDeleteDialog(true)}>
                  <DeleteIcon className={classes.iconStyle} />
                </IconButton>
              </Box>
            }
            <img 
              onClick={() => setMediaPreview(media.position)} 
              className={isSelected ? classes.selectedImage : classes.image} 
              src={media.url} 
              alt={"uploaded media"} 
            />
          </Box>
        </Grid>
      )}
      <DeleteMediaDialog
        setLoading={setLoading}
        displayDeleteDialog={displayDeleteDialog}
        setDisplayDeleteDialog={setDisplayDeleteDialog}
        deleteMediaByPosition={deleteMediaByPosition}
        mediaPosition={media.position}
      />
    </>
  );
};

export default UploadedMediaItem;
