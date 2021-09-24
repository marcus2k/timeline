const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
require("dotenv").config();

router.get(
  "/auth",
  auth,
  async (req, res, next) => {
    res.send("you are authenticated!");
  }
);

router.get("/", async (req, res, next) => {
  res.send("get request successful!");
});

router.post("/", async (req, res, next) => {
  res.send("post request successful!");
});

router.patch("/", async (req, res, next) => {
  res.send("patch request successful!");
});

router.delete("/", async (req, res, next) => {
  res.send("delete request successful!");
});

module.exports = router;
