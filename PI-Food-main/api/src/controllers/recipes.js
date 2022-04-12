const { getAllInfo, getApiInfoByPk, getDbInfoByPk } = require("../service");

const listadoRecipeByQuery = async (req, res, next) => {
  //Obtener un listado de las recetas que
  //contengan la palabra ingresada como query parameter
  //Si no existe ninguna receta mostrar un mensaje adecuado
  try {
    const { name } = req.query;

    let allInfo = await getAllInfo();

    let arrayFiltered = allInfo?.filter((el) => {
      if (el.title?.toLowerCase().includes(name.toLowerCase())) {
        return el;
      }
    });

    arrayFiltered.length
      ? res.status(200).json(arrayFiltered)
      : res
          .status(404)
          .json({ msg: "A recipe with that name does not exist." });
  } catch (error) {
    next(error);
  }
};

const detalleRecipeByID = async (req, res, next) => {
  // Obtener el detalle de una receta en particular.Debe traer solo los datos
  // pedidos en la ruta de detalle de la receta. Incluir los tipos de dieta asociados.
  try {
    const { idReceta } = req.params;

    if (idReceta.length > 10) {
      const dbInfo = await getDbInfoByPk(idReceta);

      let resultDbByID = {
        id: dbInfo.id,
        title: dbInfo.title,
        image: dbInfo.image,
        summary: dbInfo.summary,
        spoonacularScore: dbInfo.spoonacularScore,
        healthScore: dbInfo.healthScore,
        steps: dbInfo.steps,
        diets: dbInfo.types.map((t) => t.name),
      };

      dbInfo
        ? res.status(200).json(resultDbByID)
        : res.status(404).json({ msg: "We can't find that recipe." });
    } else {
      const apiInfo = await getApiInfoByPk(idReceta);
      apiInfo
        ? res.status(200).json(apiInfo)
        : res.status(404).json({ msg: "We can't find that recipe." });
    }
  } catch (error) {
    next(error);
  }
};

const allRecipes = async (req, res, next) => {
  //Obtener todas las recetas.
  try {
    const allInfo = await getAllInfo();

    allInfo.length
      ? res.status(200).json(allInfo)
      : res.status(404).json({ msg: "We can't find any recipe." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listadoRecipeByQuery,
  detalleRecipeByID,
  allRecipes,
};
