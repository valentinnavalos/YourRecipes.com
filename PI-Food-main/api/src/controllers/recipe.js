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

    // console.log("createRecipe", diets);
    
    // no consologeó el diets

    // igual diets es un arreglo.
    // y este arreglo puede tener más de un elemento.
    // aunque creo que es un array de strings, separadas por comas.
    // donde el único elemento que hay es una concatenación de dietas.

    // y tendria que ser un array de strings donde cada elemento del
    // arreglo es un string.

    // const newDiets = diets.split(",");
    //ahora newDiets es un array de dietas
    // console.log("newDiets", newDiets);

    diets.forEach(async (diet) => {
      let dietDb = await Type.findAll({ where: { name: diet } });
      //busco y traigo los tipos de dieta que coincidan con el array de dietas que viene del body

      await newRecipe.addTypes(dietDb);
    });
    // const dietDb = await Type.findAll({ where: { name: diets } });
    // //busco y traigo los tipos de dieta que coincidan con el array de dietas que viene del body

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
