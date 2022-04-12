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

    if (
      title &&
      image &&
      summary &&
      spoonacularScore &&
      healthScore &&
      diets.length &&
      steps.length
    ) {
      const newRecipe = await Recipe.create({
        title,
        image,
        summary,
        spoonacularScore,
        healthScore,
        steps,
      });

      //db relation.
      diets.forEach(async (diet) => {
        let dietDb = await Type.findAll({ where: { name: diet } });

        await newRecipe.addTypes(dietDb);
      });

      res.status(200).json({
        msg: "Recipe created successfully",
      });
    } else {
      res.status(404).json({
        msg: "Missing fields",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
};
