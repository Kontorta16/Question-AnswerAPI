const express = require("express");
const { getAccessToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const router = express.Router();
const {blockUser, deleteUser} = require("../controllers/admin");
const {checkUserExists} = require("../middlewares/database/databaseErrorHelpers");

router.use([getAccessToRoute, getAdminAccess]);
router.get("/block/:id",checkUserExists, blockUser);
router.delete("/delete/:id",checkUserExists, deleteUser);
module.exports = router;
