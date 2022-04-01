const { Router } = require("express");
// Importar todos los routers;
const recipesRoute = require("./recipes");
const typesRoute = require("./types");
const recipeRoute = require("./recipe");

const router = Router();

// Configurar los routers
router.use("/recipe", recipeRoute);
router.use("/recipes", recipesRoute);
router.use("/types", typesRoute);

module.exports = router;
