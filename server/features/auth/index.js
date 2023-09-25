const express = require("express");
const router = express.Router();

const authController = require("./controller/authController");

router.post("/create-user", authController.createUser);
router.get("/get-user", authController.getUser);

module.exports = router;
