const { Recipe, Type } = require("../db");

const createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
      diets,
    } = req.body;

    // if (title && summary) {
    const newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
    });

    if (diets) {
      const dietDb = await Type.findAll({ where: { name: diets } });
      //busco y traigo los tipos de dieta que coincidan con el array de dietas que viene del body

      await newRecipe.addTypes(dietDb);
    }
    res.json({
      msg: "Recipe created successfully",
    });

    // } else {
    // res.json({
    // message: "Missing title or summary",
    // });
    // }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
};
