const { Recipe, Type } = require("../db");

const createARecipe = async (req, res, next) => {
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

      diets.forEach(async (diet) => {
        let dietsDb = await Type.findAll({ where: { name: diet } });

        await newRecipe.addTypes(dietsDb);
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

const updateARecipeFromDb = async (req, res, next) => {
  try {
    const { idRecipe } = req.params;
    const {
      title,
      image,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      diets,
    } = req.body;
    let recipeToUpdate = {
      title,
      image,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      diets,
    };
    if (
      idRecipe.length > 10 &&
      typeof idRecipe === "string" &&
      idRecipe.includes("-")
    ) {
      // let recipeToUpdate = await Recipe.findByPk(idRecipe);
      // let recipeToUpdate = await Recipe.update(
      //   {
      //     title,
      //     image,
      //     summary,
      //     spoonacularScore,
      //     healthScore,
      //     steps,
      //   },
      //   { where: { id: idRecipe } }
      // );

      let updatedRecipe = await Recipe.update(recipeToUpdate, {
        where: { id: idRecipe },
      });

      diets?.forEach(async (diet) => {
        let dietsDb = await Type.findAll({ where: { name: diet } });

        await updatedRecipe.setTypes(dietsDb);
      });

      res.status(200).json({ msg: "Recipe updated succesfully!" });
    } else {
      res.status(404).json({ msg: "Id must be a database id" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteARecipeFromDb = async (req, res, next) => {
  try {
    const { idRecipe } = req.params;
    if (
      idRecipe.length > 10 &&
      typeof idRecipe === "string" &&
      idRecipe.includes("-")
    ) {
      await Recipe.destroy({ where: { id: idRecipe } });
      res.status(200).json({ msg: "Recipe deleted succesfully!" });
    } else {
      res.status(404).json({ msg: "Id must be a database id." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createARecipe,
  updateARecipeFromDb,
  deleteARecipeFromDb,
};
