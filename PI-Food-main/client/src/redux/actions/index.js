const { default: axios } = require("axios");
const {
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAR_DETAIL,
  POST_NEW_RECIPE,
  GET_TYPES_OF_DIETS,
  FILTER_BY_TYPE_OF_DIET,
  SORT,
  SORT_BY_SCORE,
} = require("./actionTypes");
// require("dotenv").config();

// const { HOST, PORT } = process.env;

function getRecipes() {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:3001/api/recipes/all");
      console.log("getRecipes", response);
      dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function searchRecipes(name) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3001/api/recipes?name=${name}`
      );
      console.log("searchRecipes", response.data);

      dispatch({
        type: SEARCH_RECIPES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SEARCH_RECIPES,
        payload: [],
      });
    }
  };
}

function getRecipeDetail(id) {
  return async function (dispatch) {
    try {
      let response = await axios.get(`http://localhost:3001/api/recipes/${id}`);

      console.log(response.data);
      dispatch({
        type: GET_RECIPE_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function clearDetail() {
  return async function (dispatch) {
    dispatch({
      type: CLEAR_DETAIL,
    });
  };
}

function postNewRecipe(recipe) {
  return async function (dispatch) {
    try {
      console.log(recipe);
      let response = await axios.post(
        "http://localhost:3001/api/recipe",
        recipe
      );
      console.log(response);
      dispatch({
        type: POST_NEW_RECIPE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function getTypesOfDiets() {
  return async function (dispatch) {
    try {
      let response = await axios.get("http://localhost:3001/api/types");
      dispatch({
        type: GET_TYPES_OF_DIETS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function filterByTypesOfDiets(type) {
  return {
    type: FILTER_BY_TYPE_OF_DIET,
    payload: type,
  };
}

function sortRecipes(order) {
  return {
    type: SORT,
    payload: order,
  };
}

function sortRecipesByScore(order) {
  return {
    type: SORT_BY_SCORE,
    payload: order,
  };
}

module.exports = {
  getRecipes,
  searchRecipes,
  getRecipeDetail,
  clearDetail,
  postNewRecipe,
  getTypesOfDiets,
  filterByTypesOfDiets,
  sortRecipes,
  sortRecipesByScore,
};
