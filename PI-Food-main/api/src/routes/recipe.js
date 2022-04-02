const { Router } = require("express");
const { createRecipe } = require("../controllers/recipe");

const router = Router();

router.post("/", createRecipe);

module.exports = router;
