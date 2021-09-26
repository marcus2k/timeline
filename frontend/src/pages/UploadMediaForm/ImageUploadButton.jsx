import { makeStyles } from "@material-ui/core";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  hiddenInput: {
    display: "none",
  },
}));

// This is a hidden file input HTML element
const ImageUploadButton = (props) => {
  const classes = useStyles();
  const { handleChange } = props;
  const { disabled } = props;

  const resetHandler = (e) => {
    e.target.value = null;
  };

  return (
    <>
      <Button
        variant="outlined"
        color={disabled ? "inherit" : "primary"}
        disabled={disabled}
        onClick={() => document.getElementById("image-upload").click()}
        fullWidth
      >
        Add Photo
      </Button>
      <input
        className={classes.hiddenInput}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/heic"
        id="image-upload"
        onChange={handleChange}
        required
        onClick={resetHandler}
        multiple={false}
      />
    </>
  );
};

export default ImageUploadButton;
