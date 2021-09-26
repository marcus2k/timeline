import React from "react";
import { ClipLoader } from "react-spinners";
import { Box, makeStyles } from "@material-ui/core";
import { COLORS } from "../utils/colors";
import TopWave from "../assets/splashScreen/TopWave.svg";
import BottomWave from "../assets/splashScreen/BottomWave.svg";
import AppLogo from "./layout/AppLogo";

const useStyles = makeStyles(() => ({
  top: {
    height: "33%",
    width: "auto",
    position: "fixed",
    top: 0,
    "@media (max-width: 480px)": {
      height: "25%",
    },
  },
  bottom: {
    height: "33%",
    width: "auto",
    position: "fixed",
    bottom: 0,
    "@media (max-width: 480px)": {
      height: "25%",
    },
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `${window.innerHeight}px`,
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <>
      <div>
        <img src={TopWave} alt="wave" className={classes.top} />
      </div>
      <div>
        <img src={BottomWave} alt="wave" className={classes.bottom} />
      </div>
      <div className={classes.loaderContainer}>
        <AppLogo />
        <Box paddingY={4}>
          <ClipLoader color={COLORS.PRIMARY_PURPLE} loading={true} size={50} />
        </Box>
      </div>
    </>
  );
};

export default Loading;
