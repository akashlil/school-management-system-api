const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

/* user router */
router.route("/").get(userController.getUser).post(userController.savaUser);
router.route("/:id").patch(userController.updataeUser);
router.route("/:id").delete(userController.deleteUser);
/* user router end*/

module.exports = router;
