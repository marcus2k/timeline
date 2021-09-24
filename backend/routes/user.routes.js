const express = require("express");
const router = express.Router();
const { check, oneOf, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { BadRequestError } = require("../errors/errors");
const auth = require("../middleware/auth");
require("dotenv").config();
const minPasswordLength = 5;

const UserService = require("../services/UserService");
const userService = new UserService();
const logger = require("../logs/logger");

router.get("/", auth, async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.user.userId);
    res.status(200).json({
      user,
    });
  } catch (err) {
    logger.logError(req, err);
    next(err);
  }
});

router.patch(
  "/",
  auth,
  check("name", "Please fill in your name").not().isEmpty().isString(),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        console.error(errors);
        throw new BadRequestError(
          errors
            .array()
            .map((err) => err.msg)
            .join(", ")
        );
      }
      const { userId } = req.user;
      const { name } = req.body;
      const user = await userService.updateUserDetails(
        userId,
        name,
        null,
        null
      );
      if (!user) {
        throw new NotFoundError("User does not exist");
      }
      res.status(200).json({
        user,
      });
    } catch (err) {
      logger.logError(req, err);
      next(err);
    }
  }
);

router.post(
  "/changepassword",
  auth,
  [
    check("oldPassword", "Please enter your old password").exists(),
    check(
      "newPassword",
      "Please enter a password with " +
        minPasswordLength +
        " or more characters"
    )
      .exists()
      .isLength({
        min: minPasswordLength,
      }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        throw new BadRequestError(
          errors
            .array()
            .map((err) => err.msg)
            .join(", ")
        );
      }

      const { userId } = req.user;
      const { oldPassword } = req.body;
      const { newPassword } = req.body;

      let password = await userService.getPassword(userId);

      if (!password) {
        throw new BadRequestError(
          "Your account was created through social login."
        );
      }

      if (!(await bcrypt.compare(oldPassword, password.password))) {
        throw new BadRequestError("Incorrect Password");
      }

      const user = await userService.updateUserDetails(
        userId,
        null,
        null,
        newPassword
      );
      if (!user) {
        throw new NotFoundError("User does not exist");
      }
      res.status(204).end();
    } catch (err) {
      logger.logError(req, err);
      next(err);
    }
  }
);

router.delete("/", auth, async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await userService.deleteUserByUserId(userId);
    res.status(204).end();
  } catch (err) {
    logger.logError(req, err);
    next(err);
  }
});

module.exports = router;
