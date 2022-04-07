const { Router } = require("express");
const {
  listadoRecipeByQuery,
  detalleRecipeByID,
  allRecipes,
} = require("../controllers/recipes");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;

const router = Router();

router.get("/all", allRecipes);

router.get("/", listadoRecipeByQuery);

router.get("/:idReceta", detalleRecipeByID);

module.exports = router;
