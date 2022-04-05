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
      spoonacularScore: apiInfo.spoonacularScore,
      healthScore: apiInfo.healthScore,
      steps: apiInfo.analyzedInstructions[0]?.steps,
    };

    // console.log(result);
    return result;
  } catch {
    return { msg: `A recipe with id ${id} does not exist.` };
  }
};

const getDbInfo = async () => {
  return await Recipe.findAll();
};

const getDbInfoByPk = async (id) => {
  return await Recipe.findByPk(id, {
    include: Type,
  });
};

const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();

  const allInfo = [...apiInfo, ...dbInfo];
  return allInfo;
};

module.exports = {
  getApiInfo,
  getApiInfoByPk,
  getDbInfo,
  getDbInfoByPk,
  getAllInfo,
};
