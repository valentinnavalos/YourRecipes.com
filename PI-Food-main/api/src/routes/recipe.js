const { Router } = require("express");
const { Recipe } = require("./../db");

const router = Router();

router.post("/", async (req, res, next) => {
  // Recibe los datos recolectados desde el formulario controlado de 
  // la ruta de creación de recetas por body. Crea una receta en la base de datos.
  try {
    const {
      title,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
    } = req.body;

    const newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
    });

    res.json(newRecipe);
  } catch (error) {
    next(error);
    // Para estos casos es que existe el endware de catching de errores.
  }
});

module.exports = router;
