const { default: axios } = require("axios");
const { SERVER_BACK } = require("../../constants/apiUrl");
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
  FILTER_BY_CREATION,
  UPDATE_RECIPE_FROM_DB,
  DELETE_RECIPE_FROM_DB,
} = require("./actionTypes");

function getRecipes() {
  return async function (dispatch) {
    try {
      let response = await axios.get(`${SERVER_BACK}/recipes/all`);
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
      let response = await axios.get(`${SERVER_BACK}/recipes?name=${name}`);

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
      let response = await axios.get(`${SERVER_BACK}/recipes/${id}`);

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
      let response = await axios.post(`${SERVER_BACK}/recipe`, recipe);
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
      let response = await axios.get(`${SERVER_BACK}/types`);
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

function filterByCreation(type) {
  return {
    type: FILTER_BY_CREATION,
    payload: type,
  };
}

function updateRecipeFromDb(recipeToUpdate) {
  return async function (dispatch) {
    try {
      await axios.put(
        `${SERVER_BACK}/recipe/update/${recipeToUpdate.id}`,
        recipeToUpdate
      );
      dispatch({
        type: UPDATE_RECIPE_FROM_DB,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

function deleteRecipeFromDb(idRecipe) {
  return async function (dispatch) {
    try {
      await axios.delete(`${SERVER_BACK}/recipe/delete/${idRecipe}`);
      dispatch({
        type: DELETE_RECIPE_FROM_DB,
      });
    } catch (error) {
      console.log(error);
    }
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
  filterByCreation,
  updateRecipeFromDb,
  deleteRecipeFromDb,
};
