require("dotenv").config();
const { default: axios } = require("axios");
const { Recipe, Type } = require("./../db");

const apiKey = process.env.API_KEY;

const getApiInfo = async () => {
  //Se podria buscar por id, e ir pusheandolo en un array. Devolver el array.
  // try {
  //   let id = 1;
  //   let result = [];
  //   while (id < 100) {
  //     const apiUrl = await axios.get(
  //       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
  //     );
  //     const apiInfo = await apiUrl.data;

  //     const recipe = [
  //       {
  //         id: apiInfo.id,
  //         title: apiInfo.title,
  //         summary: apiInfo.summary,
  //         spoonacularScore: apiInfo.spoonacularScore,
  //         healthScore: apiInfo.healthScore,
  //         steps: apiInfo.analyzedInstructions[0]?.steps,
  //       },
  //     ];
  //     result.push(recipe);
  //     id++;
  //   }

  //   return result;
  // } catch {
  //   result.push({ msj: "The recipe does not exist." });
  //   return result;
  // }

  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`
    );
    const apiInfo = await apiUrl.data.results.map((r) => {
      return {
        id: r.id,
        title: r.title,
        summary: r.summary,
        spoonacularScore: r.spoonacularScore,
        healthScore: r.healthScore,
        //steps ahora es un array de obj
        steps: r.analyzedInstructions[0]?.steps,
        image: r.image,
        diets: r.diets,
      };
    });
    return apiInfo;
  } catch (error) {
    return error;
  }
};

const getApiInfoByPk = async (id) => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );

    const apiInfo = await apiUrl.data;

    const result = {
      id: apiInfo.id,
      title: apiInfo.title,
      summary: apiInfo.summary,
      spoonacularScore: apiInfo.spoonacularScore
        ? apiInfo.spoonacularScore
        : "No puntuation.",
      healthScore: apiInfo.healthScore
        ? apiInfo.healthScore
        : "No health score.",
      steps: apiInfo.analyzedInstructions[0]?.steps
        ? apiInfo.analyzedInstructions[0].steps
        : "No steps.",
      image: apiInfo.image ? apiInfo.image : "No image.",
      diets: apiInfo.diets ? apiInfo.diets : "No diets.",
    };

    // console.log(result);
    return result;
  } catch {
    return { msg: `A recipe with id ${id} does not exist.` };
  }
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  });
};

const getDbInfoByPk = async (id) => {
  return await Recipe.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllInfo = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    // console.log('getAllInfo', dbInfo);

    const allInfo = [...apiInfo, ...dbInfo];
    return allInfo;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getApiInfo,
  getApiInfoByPk,
  getDbInfo,
  getDbInfoByPk,
  getAllInfo,
};
