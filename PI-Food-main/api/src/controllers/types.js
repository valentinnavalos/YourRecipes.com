const { Type } = require("../db");
const { getApiInfo } = require("../service");

const findOrCreateTypesOfDiets = async (req, res, next) => {
  // Obtener todos los tipos de dieta posibles. En una primera instancia,
  // cuando no exista ninguno, deberán precargar la base de datos con los
  // tipos de datos indicados por spoonacular acá: https://spoonacular.com/food-api/docs#Diets

  try {
    const apiInfo = await getApiInfo();

    const apiDiets = apiInfo?.map((r) => r.diets);

    const dietsList = apiDiets.flat().concat("ketogenic", "vegetarian");
    // const dietsList = apiDiets.join(",").split(",");

    let dietsListFiltered = [];
    dietsList.forEach((diet) => {
      if (!dietsListFiltered.includes(diet)) {
        dietsListFiltered.push(diet);
      }
    });

    dietsListFiltered.forEach(async (diet) => {
      await Type.findOrCreate({
        where: { name: diet },
      });
    });

    const allDbDiets = await Type.findAll();

    res.status(200).json(allDbDiets);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  findOrCreateTypesOfDiets,
};
