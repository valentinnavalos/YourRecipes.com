const { Router } = require("express");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
const { getAllInfo, getApiInfoByPk, getDbInfoByPk } = require("./controllers");

const router = Router();

router.get("/", async (req, res, next) => {
  // Obtener un listado de recetas que contengan la palabra ingresada como query parameter.
  // Si no existe ninguna receta mostrar un mensaje adecuado.

  try {
    const { name } = req.query;

    let allInfo = await getAllInfo();

    let arrayFiltered = allInfo.filter((el) => {
      if (el.title.toLowerCase().includes(name.toLowerCase())) {
        return el;
      }
    });

    !arrayFiltered.length ? res.json("We can't find that recipe.") : null;

    res.json(arrayFiltered);
  } catch (error) {
    next(error);
  }
});

router.get("/:idReceta", async (req, res, next) => {
  // Obtener el detalle de una receta en particular.Debe traer solo los datos
  // pedidos en la ruta de detalle de la receta.Incluir los tipos de dieta asociados.
  try {
    const { idReceta } = req.params;

    if (idReceta.length > 10) {
      const dbInfo = await getDbInfoByPk(idReceta);
      res.json(dbInfo);
    }

    const apiInfo = await getApiInfoByPk(idReceta);
    res.json(apiInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
