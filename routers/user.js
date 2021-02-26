const express = require("express");
const { getSingleUser, getAllUsers } = require("../controllers/user.js");
const {
  checkUserExists,
} = require("../middlewares/database/databaseErrorHelpers");
const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware");
const User = require("../models/User.js");

const router = express.Router();

router.get("/", userQueryMiddleware(User), getAllUsers);
router.get("/:id", checkUserExists, getSingleUser);

module.exports = router;
