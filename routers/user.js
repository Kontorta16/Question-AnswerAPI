const express = require("express");
const {getSingleUser, getAllUsers} = require("../controllers/user.js");
const{checkUserExists} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

router.get("/",getAllUsers);
router.get("/:id",checkUserExists, getSingleUser);

module.exports = router;