const { getAllInfo, getApiInfoByPk, getDbInfoByPk } = require("../service");

const listadoRecipeByQuery = async (req, res, next) => {
  //Obtener un listado de las recetas que
  //contengan la palabra ingresada como query parameter
  //Si no existe ninguna receta mostrar un mensaje adecuado
  try {
    const { name } = req.query;

    // if (name && name !== " ") {
      let allInfo = await getAllInfo();

      // console.log(allInfo);

      let arrayFiltered = allInfo?.filter((el) => {
        if (el.title.toLowerCase().includes(name.toLowerCase())) {
          return el;
        }
      });


      arrayFiltered.length
        ? res.json(arrayFiltered)
        : res.status(404).json({msg: "A recipe with that name does not exist."});
    // } else {
      // res.status(404).json("Please fill the input to search.");
    // }
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
      dbInfo
        ? res.json(dbInfo)
        : res.status(404).json({ msg: "We can't find that recipe." });
    } else {
      const apiInfo = await getApiInfoByPk(idReceta);
      apiInfo
        ? res.json(apiInfo)
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
      ? res.json(allInfo)
      : res.status(404).json({msg: "We can't find any recipe."});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listadoRecipeByQuery,
  detalleRecipeByID,
  allRecipes,
};
