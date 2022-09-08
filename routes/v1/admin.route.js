const express = require("express");
const adminController = require("../../controllers/admin.controller");
const router = express.Router();

router.route("/").get(adminController.getAdmin).post(adminController.saveAdmin);
router.route("/:id").patch(adminController.adminParmison);
router.route("/:id").delete(adminController.adminDelete);

module.exports = { router };
