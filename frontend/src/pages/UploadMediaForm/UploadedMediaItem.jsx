import React, { useState } from "react";
import { makeStyles, Grid, Box, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { COLORS } from "../../utils/colors";
import DeleteMediaDialog from "./DeleteMediaDialog";
import { ClipLoader } from "react-spinners";
import NotFoundImage from "../../assets/not-found.png";

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
        <Grid item xs={3} className={classes.root}>
          <p>Deleting</p>
          <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={20} />
        </Grid>
      ) : (
        <Grid item xs={3} className={classes.root}>
          <Box position="relative">
            {isDeletable && (
              <Box className={classes.deleteButtonContainer}>
                <IconButton onClick={() => setDisplayDeleteDialog(true)}>
                  <DeleteIcon className={classes.iconStyle} />
                </IconButton>
              </Box>
            )}
            <Box onClick={() => setMediaPreview(media.position)}>
              <img
                className={isSelected ? classes.selectedImage : classes.image}
                src={media.url}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = NotFoundImage;
                }}
                alt={"uploaded media"}
              />
            </Box>
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
