const express = require("express");
const recipesController = require("../controllers/recipesController");
const router = express.Router();

router.get("", recipesController.getRecipes);
router.get("/:id", recipesController.getRecipeById);
router.post("", recipesController.createRecipe);
// router.put("/:id", recipesController.editPersonById);
// router.delete("/:id", recipesController.deletePersonById);

module.exports = router;
