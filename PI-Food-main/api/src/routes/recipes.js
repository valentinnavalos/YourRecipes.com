const { default: axios } = require("axios");
const { Router } = require("express");
// const { Op } = require("sequelize/types");
// const { Sequelize, Op } = require("sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { response } = require("../app");
const { Recipe, Type } = require("./../db"); // Nos traemos el model.
const router = Router();

router.get("/", async(req, res, next) => {
  // Obtener un listado de recetas que contengan
  //la palabra ingresada como query parameter.
  // Si no existe ninguna receta mostrar un mensaje adecuado.

  try {
    const { name } = req.query;
    // recipesPromiseApi
    let recipesApi = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=887833c2633a422da6aeab9153f58d77&addRecipeInformation=true"
    );
    // console.log(recipesPromiseApi.data)
    // recipesPromiseDb
    let recipesDb = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    console.log('recipesApi', recipesApi.data)
    console.log('recipesDb', recipesDb)

    // if(recipesApi.length && recipesDb.length)

    // Promise.all([recipesPromiseApi, recipesPromiseDb]).then((response) => {
    //   const [recipesApi, recipesDb] = response;

      let filteredRecipesApi = recipesApi.data.results.map((r) => {
        if (r.title.includes(name)) {
          return {
            id: r.id,
            title: r.title,
            summary: r.summary,
            spoonacularScore: r.spoonacularScore,
            healthScore: r.healthScore,
            analyzedInstructions: r.analyzedInstructions,
          };
        }
      });

      let allRecipes = [...filteredRecipesApi, ...recipesDb];
      res.json(allRecipes);
    // });
  } catch (error) {
    // res.statusCode(404).json("No se ha podido encontrar esa receta.");
    next(error);
  }
});

router.get("/:idReceta", async (req, res, next) => {
  //- Obtener el detalle de una receta en particular.
  //- Debe traer solo los datos pedidos en la ruta de
  //-detalle de la receta.
  // Incluir los tipos de dieta asociados.
  try {
    const { idReceta } = req.params;

    const receta = await Recipe.findByPk(idReceta, {
      // Incluir los tipos de dieta asociados.
      include: Type,
    });

    res.json(receta);
  } catch (error) {
    next(error);
  }
});

// router.post("/", (req, res, next) => {
//   res.send("Soy post /recipes");
// });

// router.put("/", (req, res, next) => {
//   res.send("Soy put /recipes");
// });

router.delete("/", (req, res, next) => {
  res.send("Soy delete /recipes");
});

module.exports = router;
