const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.get("", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("", usersController.register);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
