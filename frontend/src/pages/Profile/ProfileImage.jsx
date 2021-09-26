import {
  Avatar as MaterialUiAvatar,
  Box,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Avatar from "react-avatar";
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import EditIcon from "@material-ui/icons/Edit";
import { COLORS } from "../../utils/colors";

const useStyles = makeStyles(() => ({
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  sizeAvatar: {
    height: "150px",
    width: "150px",
  },
  iconStyle: {
    fontSize: "16px",
    backgroundColor: COLORS.WHITE,
    borderRadius: "50%",
    border: `3px solid ${COLORS.LIGHT_GREY}`,
  },
}));

const ProfileImage = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const noImage = _.isNil(user.profileImage);

  return (
    <>
      <Box>
        <Box className={classes.profileImageContainer}>
          {!noImage ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton>
                  <EditIcon className={classes.iconStyle} />
                </IconButton>
              }
            >
              <MaterialUiAvatar
                alt={user.name}
                src={user.profileImage}
                sx={{ width: 100, height: 100 }}
              />
            </Badge>
          ) : (
            <Avatar name={user.name} round={true} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProfileImage;
