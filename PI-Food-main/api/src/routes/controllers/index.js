require("dotenv").config();
const { default: axios } = require("axios");
const { Recipe, Type } = require("./../../db");

const apiKey = process.env.API_KEY;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true`
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
    };
  });
  return apiInfo;
};

const getApiInfoByPk = async (id) => {
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
    steps: apiInfo.analyzedInstructions[0].steps,
    // analyzedInstructions: apiInfo.analyzedInstructions,
  };

  return result;
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
