const { Router } = require("express");
const { createARecipe, updateARecipeFromDb, deleteARecipeFromDb } = require("../controllers/recipe");

const router = Router();

router.post("/", createARecipe);

router.put('/update/:idRecipe', updateARecipeFromDb)

router.delete('/delete/:idRecipe', deleteARecipeFromDb)

module.exports = router;
