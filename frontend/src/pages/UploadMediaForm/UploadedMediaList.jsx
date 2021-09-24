import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import UploadedMediaItem from "./UploadedMediaItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const UploadedMediaList = ({
  mediaUrls,
  setMediaPreview,
  deleteMediaByPosition,
  selectedMediaUrl,
}) => {
  const classes = useStyles();
  const sortedMediaUrls = mediaUrls.sort((a, b) => {
    return a.position - b.position;
  });

  const allowDeletion = sortedMediaUrls.length > 1;

  return (
    <>
      <Grid container className={classes.root}>
        {sortedMediaUrls.map((media) => (
          <UploadedMediaItem
            key={media.position}
            media={media}
            setMediaPreview={setMediaPreview}
            isSelected={media.url === selectedMediaUrl}
            deleteMediaByPosition={deleteMediaByPosition}
            isDeletable={allowDeletion}
          />
        ))}
      </Grid>
    </>
  );
};

export default UploadedMediaList;
