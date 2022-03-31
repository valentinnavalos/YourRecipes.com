const { Router } = require("express");
const { Recipe } = require("./../db");

const router = Router();

router.post("/", async (req, res, next) => {
  // Recibe los datos recolectados desde el formulario
  //controlado de la ruta de creación de recetas por body.
  // Crea una receta en la base de datos.
  // await Recipe.destroy({ truncate: true });
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
    // el next es para pasarle el control, 
    //al controlador centralizado de errores que
    //tengo en app.js

    // Para estos casos es que existe el endware de catching de errores.
  }
});

// router.get("/", (req, res, next) => {
//   res.send("Soy get /recipe");
// });

// router.put("/", (req, res, next) => {
//   res.send("Soy put /recipe");
// });

// router.delete("/", (req, res, next) => {
//   res.send("Soy delete /recipe");
// });

module.exports = router;
