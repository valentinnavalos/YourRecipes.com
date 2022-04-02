const { Recipe } = require("../db");

const createRecipe = async (req, res, next) => {
  try {
    const { title, summary, spoonacularScore, healthScore, steps } = req.body;

    const newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
    });

    res.json(newRecipe);
  } catch (error) {
    next(error);
    // Para estos casos es que existe el endware de catching de errores.
  }
};

module.exports = {
    createRecipe,
};
