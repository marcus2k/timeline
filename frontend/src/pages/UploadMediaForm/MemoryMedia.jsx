import { makeStyles } from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import { COLORS } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
  imageStyle: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  imageContainerStyle: {
    height: "90vw",
    width: "90vw",
    maxHeight: "500px",
    maxWidth: "500px",
    backgroundColor: COLORS.LIGHT_PURPLE,
    margin: "auto",
  },
}));

const MemoryMedia = (props) => {
  const classes = useStyles();
  // TODO: How to handle invalid photo URLS?
  const { url, hasMedia, loading } = props;

  if (loading) {
    return (
      <div className={classes.imageContainerStyle}>
        <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={50} />
      </div>
    )
  }

  return (
    <div className={classes.imageContainerStyle}>
      {url && (
        <img className={classes.imageStyle} src={url} alt="memory preview" />
      )}
      {!url && !hasMedia && <p>No Media Selected</p>}
      {!url && hasMedia && <p>No Media Selected</p>}
    </div>
  );
};

export default MemoryMedia;
