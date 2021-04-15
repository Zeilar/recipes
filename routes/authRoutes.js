const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { authorize } = require('../middlewares/auth');

router.get("", authController.authenticate);
router.get("/logout", authController.logout);
router.post("/login", authorize, authController.login);

module.exports = router;
