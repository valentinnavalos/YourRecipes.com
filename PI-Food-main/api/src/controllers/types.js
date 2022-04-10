const { Type } = require("../db");
const { getApiInfo } = require("../service");

const findOrCreateTypesOfDiets = async (req, res, next) => {
  // Obtener todos los tipos de dieta posibles. En una primera instancia,
  // cuando no exista ninguno, deberán precargar la base de datos con los
  // tipos de datos indicados por spoonacular acá:
  // https://spoonacular.com/food-api/docs#Diets

  try {
    const apiInfo = await getApiInfo();

    const apiDiets = apiInfo?.map((r) => r.diets);

    const dietsList = apiDiets.flat().concat("ketogenic", "vegetarian"); //--> elimino el 2do nivel de []
    // // const dietsList = apiDiets.join(",").split(",");

    let dietsListFiltered = [];
    dietsList.forEach((diet) => {
      if (!dietsListFiltered.includes(diet)) {
        dietsListFiltered.push(diet);
      }
    });

    // let dietsListFiltered = new Set(dietsList);

    // res.json({ dietsList: Array.from(dietsListFiltered) });

    dietsListFiltered.forEach(async (diet) => {
      await Type.findOrCreate({
        where: { name: diet },
      });
    });

    const allDbDiets = await Type.findAll();

    res.status(200).json(allDbDiets);

    //-------------------------------
    //FILTRAMOS EL ARRAY DE TODAS LAS DIETS PARA QUE NO QUEDE NINGUNA REPETIDA, CREAMOS LAS TYPES EN BASE A ESE ARRAY, BUSCAMOS Y DEVOLVEMOS.
    // let dietsFiltered = [];
    // dietsList.forEach((diet) => {
    //   if (!dietsFiltered.includes(diet)) {
    //     dietsFiltered.push(diet);
    //   }
    // });

    // dietsFiltered.forEach(async (diet) => {
    //   try {
    //     await Type.Create({ name: diet });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // const allDbDiets = await Type.findAll();

    // res.json(allDbDiets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findOrCreateTypesOfDiets,
};
