const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router.route("/").get(userController.getUser).post(userController.savaUser);

module.exports = router;
