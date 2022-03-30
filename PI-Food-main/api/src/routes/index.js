const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoute = require("./recipes");
const typesRoute = require("./types");
const recipeRoute = require("./recipe");

const router = Router();

router.use("/recipe", recipeRoute);
router.use("/recipes", recipeRoute);
router.use("/types", typesRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
